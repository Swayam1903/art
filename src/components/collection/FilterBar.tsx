"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";


interface CategoryData {
    id: number;
    name: string;
}

interface FilterBarProps {
    categories: CategoryData[];
}

export default function FilterBar({ categories }: FilterBarProps) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`/collection?${params.toString()}`);
    }, 300);

    const handleCategory = (categoryName: string) => {
        const params = new URLSearchParams(searchParams);
        if (categoryName === "all") {
            params.delete("category");
        } else {
            // Create a slug-like string for URL
            const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
            // For this simple implementation, I'll pass the name or partial name search logic in page.tsx handles unslugifying roughly
            params.set("category", slug);
        }
        replace(`/collection?${params.toString()}`);
    };

    const currentCategory = searchParams.get("category");

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={!currentCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategory("all")}
                    className={!currentCategory ? "bg-accent text-white hover:bg-accent/90" : "bg-transparent"}
                >
                    All
                </Button>
                {categories.map((cat) => (
                    // Simple match check
                    <Button
                        key={cat.id}
                        variant={currentCategory === cat.name.toLowerCase().replace(/\s+/g, '-') ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategory(cat.name)}
                        className={currentCategory === cat.name.toLowerCase().replace(/\s+/g, '-') ? "bg-accent text-white hover:bg-accent/90" : "bg-transparent"}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                    type="text"
                    placeholder="Search artworks..."
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("search")?.toString()}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
                />
            </div>
        </div>
    );
}
