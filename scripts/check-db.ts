
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = await prisma.category.findMany();
    console.log('Categories:', categories);

    const artworks = await prisma.artwork.findMany({
        include: { category: true }
    });
    console.log('Artworks:', artworks.length);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
