import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createArtwork } from "@/app/actions/artwork";



export default async function NewArtworkPage() {
    const categories = await prisma.category.findMany();

    return (
        <div className="p-10 max-w-3xl mx-auto">
            <Link
                href="/admin/artworks"
                className="inline-flex items-center text-muted hover:text-foreground mb-6 text-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Artworks
            </Link>

            <h1 className="text-3xl font-serif font-bold mb-8">Add New Artwork</h1>

            <form action={createArtwork} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-border">
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium mb-2">Artwork Images</label>
                    <Input type="file" name="images" accept="image/*" multiple required className="pt-2" />
                    <p className="text-xs text-muted mt-1">Upload up to 5 images. The first image will be the main thumbnail. Recommended size: 1000x1200px.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <Input name="title" placeholder="e.g. Ethereal Dreams" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            name="categoryId"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea name="description" placeholder="Describe the artwork..." required className="min-h-[100px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Style Tags</label>
                        <Input name="style" placeholder="e.g. Modern • Abstract" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Medium</label>
                        <Input name="medium" placeholder="e.g. Oil on Canvas" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Size</label>
                        <Input name="size" placeholder="e.g. 30x40 inches" />
                    </div>
                </div>

                <div className="pt-4">
                    <Button type="submit" size="lg" className="w-full">
                        Publish Artwork
                    </Button>
                </div>
            </form>
        </div>
    );
}
