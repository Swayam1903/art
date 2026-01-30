import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createCategory, deleteCategory } from "@/app/actions/category";
import { Trash2 } from "lucide-react";

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { artworks: true } } },
        orderBy: { name: "asc" },
    });

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-3xl font-serif font-bold mb-8">Manage Categories</h1>

            {/* Create Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-white/50 mb-12">
                <h2 className="text-xl font-serif font-bold text-foreground mb-6 flex items-center">
                    <span className="w-8 h-px bg-accent mr-3"></span>
                    Add New Category
                </h2>
                <form action={createCategory} className="flex gap-4">
                    <Input
                        name="name"
                        placeholder="e.g. Contemporary Sculptures"
                        required
                        className="max-w-md h-12 bg-zinc-50 border-zinc-200 focus:border-accent text-base"
                    />
                    <Button type="submit" size="lg" className="h-12 px-8">Create Collection</Button>
                </form>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-zinc-50 border-b border-border/50">
                        <tr>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted">Name</th>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted">Artworks Count</th>
                            <th className="px-8 py-5 font-sans font-medium text-xs uppercase tracking-wider text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-zinc-50/50 transition-colors group">
                                <td className="px-8 py-6 font-medium text-foreground text-lg">{cat.name}</td>
                                <td className="px-8 py-6">
                                    <span className="inline-flex items-center justify-center px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold text-zinc-600">
                                        {cat._count.artworks} items
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <form action={async () => {
                                        "use server";
                                        await deleteCategory(cat.id);
                                    }}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                                            disabled={cat._count.artworks > 0}
                                            title={cat._count.artworks > 0 ? "Cannot delete category with artworks" : "Delete category"}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && <p className="p-10 text-center text-muted italic">No categories found. Create one to get started.</p>}
            </div>
        </div>
    );
}
