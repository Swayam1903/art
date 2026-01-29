"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-foreground">
                    POLYARTS
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/collection">Collection</NavLink>
                    <NavLink href="/about">About</NavLink>
                    <NavLink href="/contact">Contact</NavLink>
                </div>

                {/* Icons - Search Removed */}
                <div className="hidden md:flex items-center space-x-4">
                    {/* Search button removed as per request */}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col space-y-4 shadow-lg">
                    <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        Home
                    </MobileNavLink>
                    <MobileNavLink
                        href="/collection"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Collection
                    </MobileNavLink>
                    <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                        About
                    </MobileNavLink>
                    <MobileNavLink
                        href="/contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact
                    </MobileNavLink>
                </div>
            )}
        </nav>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-sm uppercase tracking-wider font-medium text-muted hover:text-accent transition-colors"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-lg font-serif font-medium text-foreground hover:text-accent transition-colors"
        >
            {children}
        </Link>
    );
}
