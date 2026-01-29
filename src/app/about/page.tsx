"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Globe, Palette, ShieldCheck } from "lucide-react";
import AboutScrollSequence from "@/components/about/AboutScrollSequence";

export default function AboutPage() {
    // --- Hero Animations (Scrollytelling) ---
    // Total height of hero container will be large (e.g. 500vh) to allow for scroll sequence
    // We need to map the scroll of the *entire page* or just a section?
    // The previous design was a full page.

    // Let's create a dedicated scroll container for the Hero if we want to mimic the Home page EXACTLY.
    // However, the About page has other content below.
    // In Home/Hero.tsx, it uses `h-[500vh]` and `sticky top-0`.

    // We will wrap the Hero in a div of 500vh high.
    const heroRef = useRef(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end end"]
    });

    // Content opacity animations mapped to heroProgress
    // 0 -> 0.15: Fade out initial text
    const opacityHero = useTransform(heroProgress, [0, 0.1], [1, 0]);
    const yHero = useTransform(heroProgress, [0, 0.1], [0, -50]);

    // 0.2 -> 0.4: Text 1 (Vision)
    const opacityText1 = useTransform(heroProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const yText1 = useTransform(heroProgress, [0.15, 0.25, 0.45], [50, 0, -50]);

    // 0.5 -> 0.7: Text 2 (Craft)
    const opacityText2 = useTransform(heroProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const yText2 = useTransform(heroProgress, [0.5, 0.6, 0.8], [50, 0, -50]);

    // 0.8 -> 1.0: Final Call (Storytelling)
    const opacityCTA = useTransform(heroProgress, [0.85, 0.95], [0, 1]);
    const yCTA = useTransform(heroProgress, [0.85, 0.95], [50, 0]);


    return (
        <div className="bg-black text-white selection:bg-accent selection:text-white">
            <Navbar />

            {/* --- SCROLL SEQUENCING HERO ---- */}
            <div ref={heroRef} className="relative h-[500vh] bg-black">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Canvas Background */}
                    <div className="absolute inset-0 z-0">
                        <AboutScrollSequence progress={heroProgress} />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Initial Hero Content */}
                    <motion.div
                        style={{ opacity: opacityHero, y: yHero }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto mix-blend-screen"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <h1 className="text-7xl md:text-9xl font-serif font-medium text-white mb-2 tracking-tighter leading-none">
                                The Art of
                            </h1>
                            <h1 className="text-7xl md:text-9xl font-serif font-light italic text-accent mb-8 tracking-tighter leading-none">
                                Storytelling
                            </h1>
                        </motion.div>

                        <motion.div className="w-px h-24 bg-gradient-to-b from-white to-transparent mx-auto my-8 opacity-50" />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="text-white/80 text-xl md:text-2xl max-w-xl mx-auto font-light leading-relaxed tracking-wide"
                        >
                            Bridging the gap between imagination and physical space.
                        </motion.p>
                    </motion.div>

                    {/* Text Overlay 1: Vision */}
                    <motion.div
                        style={{ opacity: opacityText1, y: yText1 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-serif font-medium text-white leading-tight text-center">
                            Redefining <br />
                            <span className="text-accent italic">Modern Luxury</span>
                        </h2>
                        <p className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl text-center font-light leading-relaxed">
                            A dialogue that transforms empty walls into canvases of emotion and intellect.
                        </p>
                    </motion.div>

                    {/* Text Overlay 2: Craft */}
                    <motion.div
                        style={{ opacity: opacityText2, y: yText2 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-serif font-medium text-white leading-tight text-center">
                            Crafted for the <br />
                            <span className="text-accent italic">Connoisseur</span>
                        </h2>
                        <p className="mt-8 text-xl md:text-2xl text-white/80 max-w-2xl text-center font-light leading-relaxed">
                            Every piece handpicked for quality, impact, and aesthetic harmony.
                        </p>
                    </motion.div>

                    {/* Text Overlay 3: Conclusion */}
                    <motion.div
                        style={{ opacity: opacityCTA, y: yCTA }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-white font-bold mb-8">
                            Experience the Collection
                        </h2>
                        <div className="pointer-events-auto">
                            <Link href="/collection">
                                <Button size="lg" variant="poly" className="px-12 py-8 text-xl">
                                    Explore Catalogue
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* --- REST OF THE PAGE CONTENT (White background) --- */}
            <div className="bg-background text-foreground relative z-20">
                {/* Story Section - Slightly Modified since Hero covers "Vision" now */}
                <section className="py-32 lg:py-48 px-6">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden">
                                <Image
                                    src="/images/custom/story.jpg"
                                    alt="Artist Studio"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative lg:pl-12">
                                <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Our Philosophy</span>
                                <h2 className="text-4xl md:text-5xl font-serif font-medium mb-8 leading-tight">
                                    More Than Just <br />
                                    <span className="text-muted-foreground/50">Decoration</span>
                                </h2>
                                <div className="space-y-8 text-lg md:text-xl text-muted font-light leading-loose">
                                    <p>
                                        We don't just sell art; we sell the feeling of a space completed. We collaborate with visionary artists who dare to push boundaries, ensuring that every piece in our gallery is a unique statement of elegance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values / Craft Section */}
                <section className="py-32 lg:py-40 bg-zinc-50 px-6">
                    <div className="container mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-24">
                            <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Our Craft</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-medium mt-6 mb-8 tracking-tight">Excellence in Every Detail</h2>
                            <p className="text-muted text-lg md:text-xl font-light">We obsess over the details so you don't have to.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <ValueCard
                                icon={<Palette className="w-8 h-8" />}
                                title="Curated Selection"
                                description="Every piece is handpicked for its quality, emotional impact, and aesthetic harmony with modern interiors."
                                delay={0}
                            />
                            <ValueCard
                                icon={<ShieldCheck className="w-8 h-8" />}
                                title="Premium Materials"
                                description="From museum-grade canvas to archival inks, we use only the finest materials that stand the test of time."
                                delay={0.2}
                            />
                            <ValueCard
                                icon={<Globe className="w-8 h-8" />}
                                title="Global Reach"
                                description="Connecting artists with collectors around the world through seamless, secure, and white-glove logistics."
                                delay={0.4}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-32 bg-foreground text-background text-center">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8">
                            <StatItem number="500+" label="Artworks Curated" />
                            <StatItem number="50+" label="Global Artists" />
                            <StatItem number="12k" label="Happy Collectors" />
                            <StatItem number="24/7" label="Support" />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className="p-10 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-t-2xl border-b-2 border-transparent hover:border-accent transition-all duration-500 group h-full flex flex-col"
        >
            <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-foreground mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 font-serif">{title}</h3>
            <p className="text-muted leading-loose font-light flex-grow">{description}</p>
        </motion.div>
    );
}

function StatItem({ number, label }: { number: string, label: string }) {
    return (
        <div className="space-y-2">
            <h4 className="text-5xl md:text-7xl font-bold font-serif text-accent tracking-tighter">{number}</h4>
            <p className="text-white/40 uppercase tracking-[0.15em] text-xs font-semibold">{label}</p>
        </div>
    );
}
