
"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const FlowerLogo = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Central small circle */}
        <circle cx="50" cy="50" r="5" />
        {/* 8 Coffee beans arranged in a flower pattern */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
                key={angle}
                d="M50 42 C 55 42, 60 30, 50 15 C 40 30, 45 42, 50 42 Z"
                transform={`rotate(${angle} 50 50)`}
            />
        ))}
        {/* Inner detail for each bean */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
                key={`line-${angle}`}
                d="M50 40 L50 20"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                transform={`rotate(${angle} 50 50)`}
                opacity="0.5"
            />
        ))}
    </svg>
);

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Story", href: "/#our-story" },
        { name: "Shop", href: "/#shop" },
        { name: "Menu", href: "/#menu" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled
                    ? "bg-[#0f1c15]/80 backdrop-blur-xl py-3 border-b border-white/5"
                    : "bg-transparent py-6"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-rama-gold rounded-full flex items-center justify-center shadow-lg shadow-rama-gold/30 group-hover:scale-110 transition-transform cursor-pointer">
                                <FlowerLogo className="h-7 w-7 text-[#0f1c15]" />
                            </div>
                            <div className="flex flex-col gap-0 leading-none">
                                <span className="text-xl font-black text-white tracking-tighter uppercase">
                                    RAMA
                                </span>
                                <span className="text-[10px] text-rama-gold font-serif italic tracking-[0.2em]">
                                    COFFEE
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            <div className="flex items-center gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-white/60 hover:text-rama-gold transition-all font-bold text-[10px] uppercase tracking-[0.3em] relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-rama-gold transition-all group-hover:w-full"></span>
                                    </a>
                                ))}
                            </div>

                            <div className="h-8 w-px bg-white/10 mx-2"></div>

                            <div className="flex items-center gap-6">
                                <Link href={isAuthenticated ? "/profile" : "/login"} className="text-white/80 hover:text-rama-gold transition-colors p-1">
                                    <User className="h-5 w-5" />
                                </Link>
                                <div className="relative">
                                    <Link href="/cart" className="text-white/80 hover:text-rama-gold transition-colors p-1">
                                        <ShoppingCart className="h-5 w-5" />
                                    </Link>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rama-gold text-[#0f1c15] text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                                </div>
                                <Link href="/cart" className="bg-rama-gold text-[#0f1c15] px-6 py-2 rounded-full font-black hover:bg-white hover:scale-105 transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-rama-gold/20 flex items-center justify-center">
                                    Order Now
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center gap-4">
                            <button className="text-white p-2 relative">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute top-1 right-1 w-3 h-3 bg-rama-gold rounded-full"></span>
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-white p-1"
                            >
                                <Menu className="h-8 w-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Overly Menu */}
            <div
                className={`fixed inset-0 z-[200] bg-[#0f1c15] transition-all duration-700 flex flex-col ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
            >
                <div className="p-6 flex justify-between items-center border-b border-white/5">
                    <span className="text-2xl font-black text-white">RAMA</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                        <X className="h-10 w-10" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center px-8 gap-12">
                    {navLinks.map((link, idx) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-5xl font-black text-white hover:text-rama-gold transition-all transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#shop"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-rama-gold text-[#0f1c15] py-5 rounded-2xl font-black text-xl mt-4 text-center block"
                    >
                        Order Online
                    </a>
                </div>

                <div className="p-12 text-center text-white/30 text-xs tracking-widest uppercase">
                    Addis Ababa • London • New York
                </div>
            </div>
        </>
    );
}
