"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, unlink } from "fs/promises";
import fs from "fs";
import path from "path";
import { checkAuth } from "./auth";

export async function createArtwork(formData: FormData) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const style = formData.get("style") as string;
    const medium = formData.get("medium") as string;
    const size = formData.get("size") as string;

    // Handle multiple images
    const files = formData.getAll("images") as File[];
    const validFiles = files.filter(f => f.size > 0);

    if (validFiles.length === 0) {
        throw new Error("At least one image is required");
    }

    if (validFiles.length > 5) {
        throw new Error("Maximum 5 images allowed");
    }

    const uploadedImageUrls: string[] = [];

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const file of validFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + Math.random().toString(36).substring(7) + "_" + file.name.replace(/\s+/g, "_");
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        uploadedImageUrls.push(`/uploads/${filename}`);
    }

    // The first image is the main one (for backward compatibility)
    const mainImageUrl = uploadedImageUrls[0];

    await prisma.artwork.create({
        data: {
            title,
            description,
            categoryId,
            style,
            medium,
            size,
            imageUrl: mainImageUrl,
            images: {
                create: uploadedImageUrls.map(url => ({ url }))
            }
        },
    });

    revalidatePath("/admin/artworks");
    revalidatePath("/collection");
    redirect("/admin/artworks");
}

export async function deleteArtwork(id: number, imageUrl: string) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    await prisma.artwork.delete({ where: { id } });

    // Try to delete file
    try {
        const filePath = path.join(process.cwd(), "public", imageUrl);
        await unlink(filePath);
    } catch (e) {
        console.error("Failed to delete file", e);
    }

    revalidatePath("/admin/artworks");
    revalidatePath("/collection");
}

export async function updateArtwork(id: number, formData: FormData) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categoryId = parseInt(formData.get("categoryId") as string);
    const style = formData.get("style") as string;
    const medium = formData.get("medium") as string;
    const size = formData.get("size") as string;
    const files = formData.getAll("images") as File[];

    const data: {
        title: string;
        description: string;
        categoryId: number;
        style: string;
        medium: string;
        size: string;
        imageUrl?: string;
    } = {
        title,
        description,
        categoryId,
        style,
        medium,
        size,
    };

    if (files.length > 0) {
        // Upload New Images
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        for (const file of files) {
            if (file.size === 0) continue;

            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + "_" + Math.random().toString(36).substring(7) + "_" + file.name.replace(/\s+/g, "_");
            const filePath = path.join(uploadDir, filename);

            await writeFile(filePath, buffer);
            const url = `/uploads/${filename}`;

            // If main image is not set or we want to update it?
            // Strategy: If no images exist on artwork, set first new one as main.
            // Or just add to ArtworkImage. 
            // The user can't explicitly change "main" image easily without more UI. 
            // For now, let's just add them to ArtworkImage.
            // AND if the main imageUrl is empty/dummy, update it.

            await prisma.artworkImage.create({
                data: {
                    url,
                    artworkId: id
                }
            });

            // Optional: If main image is missing, set it.
        }
    }

    await prisma.artwork.update({
        where: { id },
        data,
    });

    revalidatePath("/admin/artworks");
    revalidatePath("/collection");
    revalidatePath(`/artwork/${id}`);
    redirect("/admin/artworks");
}

export async function deleteArtworkImage(imageId: number) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const image = await prisma.artworkImage.findUnique({ where: { id: imageId } });
    if (!image) return;

    await prisma.artworkImage.delete({ where: { id: imageId } });

    // Try to delete file
    try {
        const filePath = path.join(process.cwd(), "public", image.url);
        await unlink(filePath);
    } catch (e) {
        console.error("Failed to delete file", e);
    }

    revalidatePath("/admin/artworks");
    // We might need to revalidate the edit page specifically if we are there
}
