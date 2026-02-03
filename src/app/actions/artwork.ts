"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkAuth } from "./auth";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
// generic fallback to ensure client creation even if envs are missing during build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
// Prefer Service Role Key for admin actions, fallback to Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET_NAME = "artworks";

function sanitizeFilename(name: string): string {
    return Date.now() + "_" + Math.random().toString(36).substring(7) + "_" + name.replace(/\s+/g, "_");
}

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

    for (const file of validFiles) {
        const filename = sanitizeFilename(file.name);
        const buffer = await file.arrayBuffer();

        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Upload Error:", error);
            throw new Error("Failed to upload image: " + error.message);
        }

        const { data: publicData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filename);

        uploadedImageUrls.push(publicData.publicUrl);
    }

    // The first image is the main one
    const mainImageUrl = uploadedImageUrls[0];

    await prisma.artwork.create({
        data: {
            title,
            description,
            categoryId,
            style,
            medium,
            size,
            imageUrl: mainImageUrl, // Deprecated usage but kept for compatibility
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

    // We also need to get all images associated with this artwork to delete them from storage
    const artworkImages = await prisma.artworkImage.findMany({
        where: { artworkId: id }
    });

    // Extract storage paths from URLs
    // URL format: https://[project].supabase.co/storage/v1/object/public/[bucket]/[filename]
    // We need just [filename] if we are deleting from the bucket root.

    // Helper to extract path
    const getPathFromUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split(`/${BUCKET_NAME}/`);
            return pathParts.length > 1 ? pathParts[1] : null;
        } catch {
            return null; // Handle relative or malformed URLs
        }
    };

    const pathsToDelete: string[] = [];

    // Add main image if valid
    const mainPath = getPathFromUrl(imageUrl);
    if (mainPath) pathsToDelete.push(mainPath);

    // Add related images
    artworkImages.forEach(img => {
        const p = getPathFromUrl(img.url);
        if (p && !pathsToDelete.includes(p)) pathsToDelete.push(p);
    });

    // Delete from DB first
    await prisma.artwork.delete({ where: { id } });

    // Delete from Storage
    if (pathsToDelete.length > 0) {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(pathsToDelete);

        if (error) console.error("Supabase Delete Error:", error);
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

    // If new files are uploaded
    if (files.length > 0) {
        for (const file of files) {
            if (file.size === 0) continue;

            const filename = sanitizeFilename(file.name);
            const buffer = await file.arrayBuffer();

            const { error } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filename, buffer, {
                    contentType: file.type,
                    upsert: false
                });

            if (error) {
                console.error("Supabase Upload Error:", error);
                throw new Error("Failed to upload image: " + error.message);
            }

            const { data: publicData } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filename);

            const url = publicData.publicUrl;

            await prisma.artworkImage.create({
                data: {
                    url,
                    artworkId: id
                }
            });

            // If the artwork didn't have a main image, or we want to update it?
            // For now, if 'imageUrl' on data is generic, we might want to update it.
            // But checking that requires a DB fetch. 
            // We'll update data.imageUrl ONLY if we assume we want the latest image to be the thumbnail 
            // OR if we implement logic to check if it's empty.
            // Let's leave imageUrl as is unless the user specifically could change it (which they can't in this form).
            // BUT, if the initial upload failed or something, we might have an artwork with no image?
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

    // Delete from DB
    await prisma.artworkImage.delete({ where: { id: imageId } });

    // Delete from Storage
    try {
        const urlObj = new URL(image.url);
        const pathParts = urlObj.pathname.split(`/${BUCKET_NAME}/`);
        const path = pathParts.length > 1 ? pathParts[1] : null;

        if (path) {
            await supabase.storage.from(BUCKET_NAME).remove([path]);
        }
    } catch (e) {
        console.error("Failed to parse URL or delete file", e);
    }

    revalidatePath("/admin/artworks");
}
