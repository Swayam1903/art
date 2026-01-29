import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // 1. Ensure Categories Exist (Upsert)
    const categories = [
        { name: 'Modern Abstract' },
        { name: 'Minimalist' },
        { name: 'Nature & Landscape' },
        { name: 'Wall Art' }, // Renamed from Typography
        { name: 'Portrait' },
        { name: 'Custom Work' },
    ]

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        })
    }

    // Fetch Category IDs
    const abstract = await prisma.category.findUnique({ where: { name: 'Modern Abstract' } })
    const minimalist = await prisma.category.findUnique({ where: { name: 'Minimalist' } })
    const nature = await prisma.category.findUnique({ where: { name: 'Nature & Landscape' } })
    const wallArt = await prisma.category.findUnique({ where: { name: 'Wall Art' } })
    const portrait = await prisma.category.findUnique({ where: { name: 'Portrait' } })

    if (!abstract || !minimalist || !nature || !wallArt || !portrait) {
        console.error('Failed to find categories')
        return
    }

    // 2. Clear existing artworks to prevent duplicates (Optional, but good for clean state)
    // await prisma.artwork.deleteMany({}) 

    // 3. Define the new Artworks from "Custom/art pices" -> "public/artworks/"
    const newArtworks = [
        // Portraits
        {
            title: 'Muse in Outline',
            description: 'A delicate line drawing capturing the essence of feminine grace.',
            imageUrl: '/artworks/outline_girl2_11.jpg',
            categoryId: portrait.id,
            style: 'Line Art • Minimal • Portrait',
            medium: 'Ink on Paper',
            size: '18x24"',
        },
        {
            title: 'The Golden Age',
            description: 'A classic portrait reimagined with modern textures.',
            imageUrl: '/artworks/europeana-FfCtxxy-fU4-unsplash.jpg',
            categoryId: portrait.id,
            style: 'Classic • Textured',
            medium: 'Oil on Canvas',
            size: '24x36"',
        },
        {
            title: 'Vintage Soul',
            description: 'Timeless elegance captured in a moment of reflection.',
            imageUrl: '/artworks/europeana-5TK1F5VfdIk-unsplash.jpg',
            categoryId: portrait.id,
            style: 'Vintage • Classic',
            medium: 'Oil on Canvas',
            size: '30x40"',
        },

        // Abstract
        {
            title: 'Chromaitc Flow',
            description: 'Vibrant marbling effect with deep blues and striking oranges.',
            imageUrl: '/artworks/geometric-abstract-art-marbling-colorful.jpg',
            categoryId: abstract.id,
            style: 'Abstract • Colorful • Fluid',
            medium: 'Digital Print',
            size: '40x60"',
        },
        {
            title: 'Azure Dreams',
            description: 'Soft blue hues blending into a dreamlike horizon.',
            imageUrl: '/artworks/adrianna-geo-1rBg5YSi00c-unsplash.jpg',
            categoryId: abstract.id,
            style: 'Abstract • Blue • Calm',
            medium: 'Acrylic',
            size: '30x40"',
        },
        {
            title: 'Crimson Tide',
            description: 'Bold strokes of red and black creating a dynamic motion.',
            imageUrl: '/artworks/srikanth-varma-KGFH79YVxvw-unsplash.jpg',
            categoryId: abstract.id,
            style: 'Abstract • Energetic',
            medium: 'Oil',
            size: '36x48"',
        },

        // Minimalist
        {
            title: 'Silent Geometry',
            description: 'Perspective and shadow play in a minimalist setting.',
            imageUrl: '/artworks/alice-donovan-rouse-yu68fUQDvOI-unsplash.jpg',
            categoryId: minimalist.id,
            style: 'Minimal • Geometric',
            medium: 'Photography',
            size: '24x36"',
        },
        {
            title: 'White Noise',
            description: 'Subtle textures in a monochrome palette.',
            imageUrl: '/artworks/evie-s-uuCjYxJVf4o-unsplash.jpg',
            categoryId: minimalist.id,
            style: 'Minimal • White',
            medium: 'Mixed Media',
            size: '20x20"',
        },
        {
            title: 'Linear Thoughts',
            description: 'Clean lines intersecting in a complex yet simple pattern.',
            imageUrl: '/artworks/luca-nicoletti-nazeUct7aPs-unsplash.jpg',
            categoryId: minimalist.id,
            style: 'Minimal • Line Art',
            medium: 'Digital',
            size: '18x24"',
        },

        // Nature & Landscape
        {
            title: 'Mist & Mountain',
            description: 'Fog rolling over a serene mountain landscape.',
            imageUrl: '/artworks/henrik-donnestad-t2Sai-AqIpI-unsplash.jpg',
            categoryId: nature.id,
            style: 'Landscape • Moody',
            medium: 'Photography',
            size: '40x60"',
        },
        {
            title: 'Botanical Whimsy',
            description: 'Detailed study of flora in a natural setting.',
            imageUrl: '/artworks/jene-stephaniuk--MCrF6hnojU-unsplash.jpg',
            categoryId: nature.id,
            style: 'Nature • Green',
            medium: 'Photography',
            size: '24x30"',
        },
        {
            title: 'Coastal Breeze',
            description: 'The calm sea meeting the sky in soft pastels.',
            imageUrl: '/artworks/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg',
            categoryId: nature.id,
            style: 'Seascape • Minimal',
            medium: 'Photography',
            size: '30x40"',
        },

        // Wall Art (General/Modern/Urban)
        {
            title: 'Urban Architecture',
            description: 'The geometry of the city captured from below.',
            imageUrl: '/artworks/dan-farrell-fT49QnFucQ8-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Urban • Modern',
            medium: 'Photography',
            size: '36x48"',
        },
        {
            title: 'Classic Hall',
            description: 'The grandeur of historic architecture.',
            imageUrl: '/artworks/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Classic • Architecture',
            medium: 'Photography',
            size: '30x40"',
        },
        {
            title: 'Library Silence',
            description: 'A study of light and space in a public library.',
            imageUrl: '/artworks/boston-public-library-YoK5pBcSY8s-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Architecture • Interior',
            medium: 'Photography',
            size: '24x36"',
        },
        {
            title: 'Golden Statue',
            description: 'Detailed closeup of a classical sculpture.',
            imageUrl: '/artworks/europeana-L7gFG4F8NHc-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Sculpture • Classic',
            medium: 'Photography',
            size: '20x30"',
        },
        {
            title: 'The Great Hall',
            description: 'Expansive interior showing depth and history.',
            imageUrl: '/artworks/the-cleveland-museum-of-art-U10hNZLClmY-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Interior • Classic',
            medium: 'Photography',
            size: '36x48"',
        },
        {
            title: 'Abstract Form II',
            description: 'A study in shape and color.',
            imageUrl: '/artworks/luca-nicoletti-O8CHmj0zgAg-unsplash.jpg',
            categoryId: abstract.id,
            style: 'Abstract • Modern',
            medium: 'Digital',
            size: '24x24"',
        },
        {
            title: 'Faded Memories',
            description: 'A vintage texture overlaid with modern elements.',
            imageUrl: '/artworks/europeana-mZYGRPZLp58-unsplash.jpg',
            categoryId: wallArt.id,
            style: 'Vintage • Collage',
            medium: 'Mixed Media',
            size: '18x24"',
        },
        {
            title: 'Solo',
            description: 'A singular figure in a vast space.',
            imageUrl: '/artworks/6682690.jpg',
            categoryId: portrait.id,
            style: 'Minimal • Portrait',
            medium: 'Photography',
            size: '20x30"',
        }
    ]

    console.log(`Adding ${newArtworks.length} new artworks...`)

    for (const art of newArtworks) {
        await prisma.artwork.create({
            data: art,
        })
    }

    console.log('Seed data inserted successfully')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
