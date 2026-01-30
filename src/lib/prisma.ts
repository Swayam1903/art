import { PrismaClient } from "@prisma/client";

// Debug log for Vercel
console.log("[Prisma Init] DATABASE_URL is", process.env.DATABASE_URL ? "DEFINED" : "UNDEFINED");


const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
