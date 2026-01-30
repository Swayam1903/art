"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Palette, Truck } from "lucide-react";

const features = [
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Handcrafted Excellence",
        description: "Each piece is meticulously crafted by master artists using premium materials.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Authentic Quality",
        description: "Signed certificates of authenticity included with every original artwork.",
    },
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Global Delivery",
        description: "Carefully packaged and shipped worldwide, ensuring your art arrives safely.",
    },
];

export default function WhyChoose() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-xl font-serif font-bold mb-3 text-foreground">
                                {feature.title}
                            </h3>
                            <p className="text-muted leading-relaxed max-w-xs mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
