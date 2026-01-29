"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function CustomerSpaces() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -50]); // Moves up slightly
    const yColumn2 = useTransform(scrollYProgress, [0, 1], [50, -50]); // Moves more

    return (
        <section ref={containerRef} className="py-24 bg-zinc-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-accent uppercase tracking-widest text-sm font-medium">
                            In The Wild
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-foreground">
                            Art That Transforms
                        </h2>
                        <p className="text-muted text-lg leading-relaxed mb-8">
                            See how our collections elevate real homes and offices. From minimalist lofts to grand foyers, PolyArts brings spaces to life.
                        </p>
                        <Link href="/collection">
                            <Button variant="poly">Find Your Piece</Button>
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            style={{ y: yColumn1 }}
                            className="space-y-4"
                        >
                            <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gray-200">
                                <Image
                                    src="/transforms/europeana-FfCtxxy-fU4-unsplash.jpg"
                                    alt="Art space 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-200">
                                <Image
                                    src="/transforms/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg"
                                    alt="Art space 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            style={{ y: yColumn2 }}
                            className="space-y-4 pt-8"
                        >
                            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-200">
                                <Image
                                    src="/transforms/luca-nicoletti-O8CHmj0zgAg-unsplash.jpg"
                                    alt="Art space 3"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gray-200">
                                <Image
                                    src="/transforms/the-cleveland-museum-of-art-U10hNZLClmY-unsplash.jpg"
                                    alt="Art space 4"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
