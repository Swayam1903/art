import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ArtworkCard from "@/components/collection/ArtworkCard";



// Server Component
export default async function ArtworkPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
        return <div>Invalid ID</div>;
    }

    const artwork = await prisma.artwork.findUnique({
        where: { id },
        include: {
            category: true,
            images: true,
        },
    });

    if (!artwork) {
        return <div>Artwork not found</div>;
    }

    // Fetch related artworks (same category, excluding current)
    const relatedArtworks = await prisma.artwork.findMany({
        where: {
            categoryId: artwork.categoryId,
            id: { not: artwork.id },
        },
        include: { category: true },
        take: 3,
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-24">
                <Link
                    href="/collection"
                    className="inline-flex items-center text-muted hover:text-foreground mb-8 text-sm uppercase tracking-wider transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Section */}
                    <div className="bg-zinc-100 p-8 flex flex-col gap-8">
                        {/* Main Image */}
                        <div className="relative h-[60vh] md:h-[80vh] w-full bg-zinc-100 rounded-sm overflow-hidden shadow-sm">
                            <Image
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 768px) 100vw, 70vw"
                            />
                        </div>

                        {/* Gallery Grid */}
                        {artwork.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {artwork.images.map((img: { id: number; url: string }) => (
                                    <div key={img.id} className="relative h-48 md:h-64 bg-white rounded-sm overflow-hidden shadow-sm hover:opacity-95 transition-opacity cursor-zoom-in">
                                        <Image
                                            src={img.url}
                                            alt={`${artwork.title} - Detail`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <span className="text-accent uppercase tracking-widest text-sm font-medium mb-4">
                            {artwork.category.name}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                            {artwork.title}
                        </h1>

                        <div className="space-y-6 text-muted border-t border-border pt-8 mb-8">
                            <p className="text-lg leading-relaxed">
                                {artwork.description}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="block text-foreground font-medium mb-1">Medium</span>
                                    {artwork.medium || "N/A"}
                                </div>
                                <div>
                                    <span className="block text-foreground font-medium mb-1">Dimensions</span>
                                    {artwork.size || "N/A"}
                                </div>
                                <div>
                                    <span className="block text-foreground font-medium mb-1">Style</span>
                                    {artwork.style || "N/A"}
                                </div>
                                <div>
                                    <span className="block text-foreground font-medium mb-1">Frame</span>
                                    Available / Custom
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="flex-1">
                                <Button variant="poly" className="w-full">
                                    Contact for Custom Work
                                </Button>
                            </Link>
                            <Link href="/contact?inquiry=similar" className="flex-1">
                                <Button variant="outline" className="w-full py-6 uppercase tracking-wider">
                                    Request Similar Art
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Works */}
            {relatedArtworks.length > 0 && (
                <div className="bg-zinc-50 py-24">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-serif font-bold mb-12 text-center">You May Also Like</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArtworks.map((art: any, idx: number) => (
                                <ArtworkCard key={art.id} artwork={art} index={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
