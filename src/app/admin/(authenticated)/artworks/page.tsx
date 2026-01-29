import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, ExternalLink, Edit } from "lucide-react";
import { deleteArtwork } from "@/app/actions/artwork";



export default async function AdminArtworksPage() {
    const artworks = await prisma.artwork.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold">Manage Artworks</h1>
                <Link href="/admin/artworks/new">
                    <Button variant="default" className="bg-foreground text-background hover:bg-foreground/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Artwork
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-medium text-muted">Image</th>
                            <th className="px-6 py-4 font-medium text-muted">Title</th>
                            <th className="px-6 py-4 font-medium text-muted">Category</th>
                            <th className="px-6 py-4 font-medium text-muted">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {artworks.map((art: any) => (
                            <tr key={art.id}>
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 rounded overflow-hidden">
                                        <Image
                                            src={art.imageUrl}
                                            alt={art.title}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium">{art.title}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-zinc-100 rounded text-xs">
                                        {art.category.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <Link href={`/artwork/${art.id}`} target="_blank">
                                        <Button variant="ghost" size="icon" title="View Public Page">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/admin/artworks/${art.id}/edit`}>
                                        <Button variant="ghost" size="icon" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <form action={async () => {
                                        "use server";
                                        await deleteArtwork(art.id, art.imageUrl);
                                    }}>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {artworks.length === 0 && (
                    <div className="p-12 text-center text-muted">
                        No artworks found. Click &quot;Add New Artwork&quot; to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
