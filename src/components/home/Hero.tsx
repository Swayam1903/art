"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import ScrollSequence from "./ScrollSequence";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Content opacity animations
    // 0 -> 0.15: Fade out initial text
    const opacityHero = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const yHero = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

    // 0.2 -> 0.4: Text 1
    const opacityText1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const yText1 = useTransform(scrollYProgress, [0.15, 0.25, 0.45], [50, 0, -50]);

    // 0.5 -> 0.7: Text 2
    const opacityText2 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const yText2 = useTransform(scrollYProgress, [0.5, 0.6, 0.8], [50, 0, -50]);

    // 0.8 -> 1.0: Final Call to Action
    const opacityCTA = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const yCTA = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas Background */}
                <div className="absolute inset-0 z-0">
                    <ScrollSequence progress={scrollYProgress} />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Initial Hero Content */}
                <motion.div
                    style={{ opacity: opacityHero, y: yHero }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-white/80 uppercase tracking-[0.2em] text-sm md:text-base mb-4"
                    >
                        Premium Wall Art & Paintings
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
                    >
                        Art That <span className="text-accent italic">Defines</span> Your Space
                    </motion.h1>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <span className="text-white/60 text-sm uppercase tracking-widest animate-pulse">Scroll to Experience</span>
                        <div className="w-[1px] h-12 bg-white/20">
                            <div className="w-full h-1/2 bg-accent animate-bounce" />
                        </div>
                    </div>
                </motion.div>

                {/* Text Overlay 1: Details */}
                <motion.div
                    style={{ opacity: opacityText1, y: yText1 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white font-bold text-center max-w-3xl leading-tight">
                        Every brushstroke tells a story.
                    </h2>
                </motion.div>

                {/* Text Overlay 2: Emotion */}
                <motion.div
                    style={{ opacity: opacityText2, y: yText2 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white font-bold text-center max-w-3xl leading-tight">
                        Crafted for the <span className="text-accent">connoisseur</span>.
                    </h2>
                </motion.div>

                {/* Text Overlay 3: CTA */}
                <motion.div
                    style={{ opacity: opacityCTA, y: yCTA }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-8">
                        Find Your Masterpiece
                    </h2>
                    <div className="pointer-events-auto flex gap-4">
                        <Link href="/collection">
                            <Button variant="poly">Explore Collections</Button>
                        </Link>
                        <Link href="/contact">
                            <Button
                                variant="outline"
                                className="text-white border-white hover:bg-white hover:text-black rounded-xl px-8 py-6 uppercase tracking-wider font-semibold"
                            >
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
