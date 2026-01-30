"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
            <Navbar />

            <div className="pt-24 pb-12 lg:pt-32 lg:pb-24">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-4xl mx-auto text-center mb-16"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                            Get in <span className="text-accent italic">Touch</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                            Have a question about a collection, interested in a commission, or just want to say hello? We&apos;re here to help you find the perfect piece.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5 space-y-12 lg:pr-12"
                        >
                            <div className="space-y-8">
                                <h2 className="text-3xl font-serif font-semibold">Contact Details</h2>
                                <p className="text-muted">
                                    We encourage you to reach out for personalized art consultations or any inquiries regarding our current exhibitions.
                                </p>

                                <div className="space-y-6">
                                    <ContactItem
                                        icon={<Mail className="w-5 h-5" />}
                                        label="Email Us"
                                        value="hello@polyarts.com"
                                        href="mailto:hello@polyarts.com"
                                    />
                                    <ContactItem
                                        icon={<Phone className="w-5 h-5" />}
                                        label="Call Us"
                                        value="+1 (555) 000-0000"
                                        href="tel:+15550000000"
                                    />
                                    <ContactItem
                                        icon={<MapPin className="w-5 h-5" />}
                                        label="Visit Studio"
                                        value="123 Art District Blvd, New York, NY"
                                        subValue="By Appointment Only"
                                    />
                                </div>
                            </div>

                            <div className="p-8 bg-zinc-50 border border-border rounded-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                                <h3 className="text-xl font-serif font-medium mb-2 relative z-10">FAQ</h3>
                                <p className="text-muted text-sm relative z-10 mb-4">
                                    Before reaching out, you might find your answer in our frequently asked questions.
                                </p>
                                <a href="#" className="inline-block text-sm font-bold uppercase tracking-wider underline decoration-accent/50 hover:decoration-accent transition-colors relative z-10">
                                    Read FAQ
                                </a>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-border/50"
                        >
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm uppercase tracking-wider font-bold text-muted-foreground/80">Name</label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-muted/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm uppercase tracking-wider font-bold text-muted-foreground/80">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-muted/30"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm uppercase tracking-wider font-bold text-muted-foreground/80">Subject</label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        placeholder="Commission Inquiry"
                                        className="bg-transparent border-t-0 border-x-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-accent transition-colors placeholder:text-muted/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm uppercase tracking-wider font-bold text-muted-foreground/80">Message</label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us about your project..."
                                        className="min-h-[150px] bg-zinc-50/50 border-border focus-visible:ring-1 focus-visible:ring-accent/50 resize-none p-4 rounded-xl"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button size="lg" className="w-full md:w-auto rounded-full px-12 py-6 text-lg group bg-foreground text-background hover:bg-accent hover:text-white transition-all duration-300">
                                        Send Message
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function ContactItem({
    icon,
    label,
    value,
    subValue,
    href
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
    href?: string;
}) {
    const Content = () => (
        <div className="flex items-start space-x-4 p-4 -ml-4 rounded-xl hover:bg-zinc-50 transition-colors group cursor-pointer">
            <div className="p-3 bg-zinc-100 rounded-full text-foreground group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted mb-1">{label}</p>
                <p className="text-lg font-medium text-foreground">{value}</p>
                {subValue && <p className="text-sm text-muted mt-1">{subValue}</p>}
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block">
                <Content />
            </a>
        );
    }

    return <Content />;
}
