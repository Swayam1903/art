"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// New categories mapping using ONLY images from public/trending (which are from Custom/art piece)
const categories = [
    {
        id: 1,
        title: "Modern Abstract",
        image: "/trending/adrianna-geo-1rBg5YSi00c-unsplash.jpg",
        slug: "modern-abstract",
        size: "large", // Spans 2 cols, 2 rows
    },
    {
        id: 2,
        title: "Minimalist",
        image: "/trending/alice-donovan-rouse-yu68fUQDvOI-unsplash.jpg",
        slug: "minimalist",
        size: "normal",
    },
    {
        id: 3,
        title: "Nature & Landscape",
        image: "/trending/henrik-donnestad-t2Sai-AqIpI-unsplash.jpg",
        slug: "nature-landscape",
        size: "normal",
    },
    {
        id: 5, // ID 5 for uniqueness
        title: "Portrait",
        // Using a new image from the transfers
        image: "/transforms/outline_girl2_11.jpg",
        slug: "portrait",
        size: "normal",
    },
    {
        id: 4,
        title: "Wall Art",
        image: "/trending/dan-farrell-fT49QnFucQ8-unsplash.jpg",
        slug: "wall-art",
        size: "wide", // Spans 2 cols
    },
];

export default function FeaturedCategories() {
    return (
        <section className="py-32 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-accent uppercase tracking-[0.2em] text-sm font-bold">
                        The Collections
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold mt-4 text-foreground">
                        Curated Categories
                    </h2>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {categories.map((cat: any, index: number) => (
                        <Link
                            key={cat.id}
                            href={`/collection?category=${cat.slug}`}
                            className={`group relative overflow-hidden rounded-2xl ${cat.size === "large"
                                ? "md:col-span-2 md:row-span-2"
                                : cat.size === "wide"
                                    ? "md:col-span-2"
                                    : ""
                                }`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                                        {cat.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                        <span className="text-sm font-medium uppercase tracking-wider">Explore</span>
                                        <ArrowArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArrowArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
