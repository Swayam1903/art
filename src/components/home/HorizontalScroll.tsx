"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Same collections data source
const collections = [
    {
        id: 1,
        title: "Abstract Horizons",
        image: "/trending/adrianna-geo-1rBg5YSi00c-unsplash.jpg",
        description: "Bold strokes meeting infinite possibilities.",
    },
    {
        id: 2,
        title: "Silent Geometry",
        image: "/trending/alice-donovan-rouse-yu68fUQDvOI-unsplash.jpg",
        description: "Structure and form in perfect harmony.",
    },
    {
        id: 3,
        title: "Ethereal Nature",
        image: "/trending/henrik-donnestad-t2Sai-AqIpI-unsplash.jpg",
        description: "The soft whispers of the natural world.",
    },
    {
        id: 4,
        title: "Urban Rhythms",
        image: "/trending/dan-farrell-fT49QnFucQ8-unsplash.jpg",
        description: "The pulse of the city captured on canvas.",
    },
    {
        id: 5,
        title: "Classic Revival",
        image: "/trending/birmingham-museums-trust-wKlHsooRVbg-unsplash.jpg",
        description: "Timeless pieces reimagined for today.",
    },
    {
        id: 6,
        title: "Modern Masters",
        image: "/trending/europeana-5TK1F5VfdIk-unsplash.jpg",
        description: "Contemporary works from rising stars.",
    },
    {
        id: 7,
        title: "Serene Spaces",
        image: "/trending/jene-stephaniuk--MCrF6hnojU-unsplash.jpg",
        description: "Art that brings calm to your sanctuary.",
    },
    {
        id: 8,
        title: "Historical Echoes",
        image: "/trending/boston-public-library-YoK5pBcSY8s-unsplash.jpg",
        description: "A glimpse into the past.",
    },
];

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-16 px-24">
                    {/* Header Card */}
                    <div className="flex flex-col justify-center min-w-[400px]">
                        <h2 className="text-6xl md:text-8xl font-serif font-bold text-foreground mb-6">
                            Trending <br /> <span className="text-accent italic">Gallery</span>
                        </h2>
                        <p className="text-xl text-muted max-w-md">
                            A curated walkthrough of our most defining collections.
                            Scroll to explore.
                        </p>
                    </div>

                    {/* Collection Cards */}
                    {collections.map((collection: any) => (
                        <Card key={collection.id} collection={collection} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const Card = ({ collection }: { collection: typeof collections[0] }) => {
    return (
        <div className="group relative h-[600px] w-[450px] overflow-hidden bg-white/5 rounded-2xl border border-white/10 shadow-2xl flex-shrink-0">
            <div
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
            >
                <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

            <div className="absolute bottom-0 left-0 right-0 p-10 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-accent uppercase tracking-widest text-xs font-bold mb-2 block">
                    Collection {collection.id.toString().padStart(2, '0')}
                </span>
                <h3 className="text-4xl font-serif font-bold text-white mb-4">
                    {collection.title}
                </h3>
                <p className="text-white/80 text-lg mb-8 line-clamp-2">
                    {collection.description}
                </p>
                <Link href="/collection">
                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-full uppercase tracking-wider text-sm hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2">
                        View Gallery <ArrowUpRight className="w-4 h-4" />
                    </button>
                </Link>
            </div>
        </div>
    );
};
