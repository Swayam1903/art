import { prisma } from "@/lib/prisma";
import ArtworkCard from "@/components/collection/ArtworkCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterBar from "@/components/collection/FilterBar";

// This is a Server Component
export default async function CollectionPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams; // Await searchParams in Next.js 15
    const category = resolvedSearchParams.category as string | undefined;
    const search = resolvedSearchParams.search as string | undefined;


    // ...

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (category && category !== "all") {
        // Basic slug matching: "modern-abstract" -> "Modern Abstract"
        // Ideally we store slugs in DB, but for now exact match or fuzzy match
        // Let's assume we pass ID or exact name. For UI niceness, I'll pass slug and try to match name.
        // Simplifying: searchParams pass category name properly formatted or we use contains.

        // Better approach: Let Prisma filter by category name (contains)
        where.category = {
            name: {
                contains: category.replace(/-/g, ' '), // simple un-slugify
            }
        };
    }

    if (search) {
        where.OR = [
            { title: { contains: search } },
            { description: { contains: search } },
            { style: { contains: search } },
        ];
    }

    const artworks = await prisma.artwork.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    const categories = await prisma.category.findMany();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="bg-zinc-50 pt-32 pb-16 px-6">
                <div className="container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Collections
                    </h1>
                    <p className="text-muted max-w-xl">
                        Browse our curated selection of fine art. Filter by style, medium, or category to find the perfect piece for your space.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <FilterBar categories={categories} />

                {artworks.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted text-lg">No artworks found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {artworks.map((artwork, index) => (
                            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
