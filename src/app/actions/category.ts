"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkAuth } from "./auth";

export async function createCategory(formData: FormData) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    if (!name) return;

    await prisma.category.create({
        data: { name },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/artworks/new");
    revalidatePath("/collection");
}

export async function deleteCategory(id: number) {
    const isAuth = await checkAuth();
    if (!isAuth) throw new Error("Unauthorized");

    // Check if used
    const count = await prisma.artwork.count({ where: { categoryId: id } });
    if (count > 0) {
        throw new Error("Cannot delete category with associated artworks.");
    }

    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidatePath("/collection");
}
