"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { error: "Name, email, and message are required." };
    }

    try {
        await prisma.inquiry.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        revalidatePath("/admin/inquiries"); // Assuming there might be an admin page later
        return { success: "Thank you for your message! We will get back to you soon." };
    } catch (error) {
        console.error("Failed to submit inquiry:", error);
        return { error: "Something went wrong. Please try again later." };
    }
}
