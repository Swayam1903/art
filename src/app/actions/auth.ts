"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const password = formData.get("password");

    // Simple hardcoded password for demonstration
    // In production, use environment variables and proper hashing
    if (password === "admin123") {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin");
    } else {
        return { error: "Invalid password" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}
