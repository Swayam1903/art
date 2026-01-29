"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@prisma/client";
import { Plus } from "lucide-react";

interface ArtworkCardProps {
    artwork: Artwork & { category: { name: string } };
    index?: number;
}

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
    return (
        <Link href={`/artwork/${artwork.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative cursor-pointer"
            >
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Plus className="w-6 h-6 text-foreground" />
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-xs uppercase tracking-widest text-muted">
                        {artwork.category.name}
                    </span>
                    <h3 className="text-lg font-serif font-medium text-foreground mt-1 group-hover:text-accent transition-colors">
                        {artwork.title}
                    </h3>
                    <p className="text-sm text-muted mt-1">{artwork.style}</p>
                </div>
            </motion.div>
        </Link>
    );
}
