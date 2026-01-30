import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Palette, Layers, Plus } from "lucide-react";
import Link from "next/link";



export default async function AdminDashboard() {
    const artworkCount = await prisma.artwork.count();
    const categoryCount = await prisma.category.count();

    // Recent 5
    const recentArtworks = await prisma.artwork.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <header className="mb-12">
                <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted tracking-wide text-sm uppercase">Overview & Statistics</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-sans font-medium text-muted uppercase tracking-wider">Total Artworks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline space-x-2">
                            <p className="text-6xl font-serif font-bold text-foreground">{artworkCount}</p>
                            <span className="text-sm text-accent font-medium">pieces</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-sans font-medium text-muted uppercase tracking-wider">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline space-x-2">
                            <p className="text-6xl font-serif font-bold text-foreground">{categoryCount}</p>
                            <span className="text-sm text-accent font-medium">collections</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Link href="/admin/artworks/new" className="group block p-8 bg-gradient-to-br from-white to-zinc-50 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">Add Artwork</h3>
                        <div className="p-3 bg-white shadow-sm rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                            <Plus className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">Upload new masterpieces to your curated collection.</p>
                </Link>

                <Link href="/admin/artworks" className="group block p-8 bg-gradient-to-br from-white to-zinc-50 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">Manage</h3>
                        <div className="p-3 bg-white shadow-sm rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                            <Palette className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">Edit details or remove existing works from the gallery.</p>
                </Link>

                <Link href="/admin/categories" className="group block p-8 bg-gradient-to-br from-white to-zinc-50 rounded-xl shadow-md border border-white/50 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">Categories</h3>
                        <div className="p-3 bg-white shadow-sm rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                            <Layers className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">Organize your portfolio structure and collections.</p>
                </Link>
            </div>

            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center space-x-3">
                <span>Recently Added</span>
                <span className="h-px bg-border flex-1 ml-4 block opacity-50"></span>
            </h2>
            <div className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-border/50">
                        <tr>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted">Title</th>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted">Category</th>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {recentArtworks.map((art) => (
                            <tr key={art.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-8 py-5 font-medium text-foreground text-lg">{art.title}</td>
                                <td className="px-8 py-5"><span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-medium tracking-wide text-zinc-600 uppercase border border-zinc-200">{art.category.name}</span></td>
                                <td className="px-8 py-5 text-muted font-mono text-sm">{new Date(art.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {recentArtworks.length === 0 && <p className="p-10 text-center text-muted italic">No artworks have been added yet.</p>}
            </div>
        </div>
    );
}
