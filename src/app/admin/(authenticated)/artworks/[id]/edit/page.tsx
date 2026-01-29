import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { updateArtwork } from "@/app/actions/artwork";
import { DeleteImageButton } from "@/components/admin/DeleteImageButton";



export default async function EditArtworkPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params; // Await params in Node env or Next 15 if needed, usually params is promise in layout but page props depends. 
    // In Next.js 15, params is a Promise.
    const id = parseInt(resolvedParams.id);

    const artwork = await prisma.artwork.findUnique({
        where: { id },
        include: { images: true }
    });
    if (!artwork) return <div>Artwork not found</div>;

    const categories = await prisma.category.findMany();

    const updateAction = updateArtwork.bind(null, id);

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Link
                href="/admin/artworks"
                className="inline-flex items-center text-muted hover:text-foreground mb-6 text-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Artworks
            </Link>

            <h1 className="text-3xl font-serif font-bold mb-8">Edit Artwork</h1>

            <form action={updateAction} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-border">
                {/* Image Upload */}
                {/* Image Management */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium">Current Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Main Image (Legacy compatibility) */}
                        <div className="relative aspect-[4/5] bg-zinc-100 rounded overflow-hidden group">
                            <Image
                                src={artwork.imageUrl}
                                alt="Main"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                                Main Image
                            </div>
                        </div>

                        {/* Additional Images */}
                        {artwork.images.map((img: { id: number; url: string }) => (
                            <div key={img.id} className="relative aspect-[4/5] bg-zinc-100 rounded overflow-hidden group">
                                <Image
                                    src={img.url}
                                    alt="Detail"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* We need client interaction here. 
                                        Since we are in a server component (page.tsx), we can wrap the delete button in a small client component 
                                        OR use a server action form. 
                                    */}
                                    <DeleteImageButton imageId={img.id} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Add More Images</label>
                        <Input type="file" name="images" accept="image/*" multiple className="pt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input name="title" defaultValue={artwork.title} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            name="categoryId"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            defaultValue={artwork.categoryId}
                            required
                        >
                            {categories.map((c: { id: number; name: string }) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea name="description" defaultValue={artwork.description} required className="min-h-[100px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Style Tags</label>
                        <Input name="style" defaultValue={artwork.style || ""} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Medium</label>
                        <Input name="medium" defaultValue={artwork.medium || ""} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Size</label>
                        <Input name="size" defaultValue={artwork.size || ""} />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                        Update Artwork
                    </Button>
                </div>
            </form>
        </div>
    );
}
