import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1C1C1E] text-white py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-2xl font-serif font-bold tracking-widest mb-6">
                        POLYARTS
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Premium handcrafted wall art and paintings designed for modern interiors.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-serif font-semibold mb-6 text-accent">
                        Explore
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/collection" className="text-gray-400 hover:text-accent transition-colors">
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-gray-400 hover:text-accent transition-colors">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-lg font-serif font-semibold mb-6 text-accent">
                        Legal
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <span className="text-gray-400 cursor-pointer hover:text-accent transition-colors">
                                Privacy Policy
                            </span>
                        </li>
                        <li>
                            <span className="text-gray-400 cursor-pointer hover:text-accent transition-colors">
                                Terms of Service
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-serif font-semibold mb-6 text-accent">
                        Follow Us
                    </h3>
                    <div className="flex space-x-4">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-accent transition-colors">
                            <Instagram className="w-5 h-5 text-white" />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-accent transition-colors">
                            <Facebook className="w-5 h-5 text-white" />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-accent transition-colors">
                            <Mail className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} POLYARTS. All rights reserved.
                <span className="mx-2">•</span>
                <Link href="/admin" className="hover:text-accent transition-colors">
                    Admin
                </Link>
            </div>
        </footer>
    );
}
