"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, Star, ShieldCheck, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const products = [
    {
        id: 1,
        name: "Ethiopian Yirgacheffe",
        roast: "Light Roast",
        price: 1200,
        currency: "ETB",
        notes: "Floral with hints of citrus and a tea-like finish.",
        image: "https://plus.unsplash.com/premium_photo-1666976510011-28202995a11b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXRoaW9waWFuJTIwY29mZmVlfGVufDB8fDB8fHww",
        description: "Yirgacheffe is a small region in Ethiopia known for producing some of the most distinctive coffees in the world. This light roast highlights the delicate floral aromas and bright citrus acidity that define the region's profile.",
    },
    {
        id: 2,
        name: "Sidama Guji",
        roast: "Medium Roast",
        price: 1150,
        currency: "ETB",
        notes: "Notes of berries and wine-like acidity.",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop",
        description: "Guji coffee comes from the southern highlands of Ethiopia. This medium roast offers a perfect balance of deep berry sweetness and a sophisticated wine-like acidity, making it a favorite for both filter coffee and espresso.",
    },
    {
        id: 3,
        name: "Harrar Bold",
        roast: "Dark Roast",
        price: 1350,
        currency: "ETB",
        notes: "Chocolatey, spicy, and intense body.",
        image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=800&auto=format&fit=crop",
        description: "Harrar is one of the oldest coffee-growing regions. Our dark roast brings out the intense chocolatey body and unique blueberry undertones that have made Harrar beans legendary among coffee connoisseurs.",
    },
    {
        id: 4,
        name: "Kaffa Origin",
        roast: "Medium-Dark Roast",
        price: 1280,
        currency: "ETB",
        notes: "Wild forest coffee with notes of dark chocolate and deep spice.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
        description: "Kaffa is considered the birthplace of Arabica coffee. These beans are harvested from high-altitude wild forests, offering a complex profile with deep spicy notes and a rich, dark chocolate finish.",
    },
];

const PACKAGING_OPTIONS = [
    { label: "500g", multiplier: 0.55 },
    { label: "1kg", multiplier: 1 },
    { label: "3kg", multiplier: 2.8 },
];

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState(PACKAGING_OPTIONS[1]); // Default 1kg

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl font-bold">Product not found</p>
                <button onClick={() => router.push("/")} className="ml-4 text-rama-gold underline">Go Back</button>
            </div>
        );
    }

    const currentPrice = Math.round(product.price * selectedSize.multiplier);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product, selectedSize.label);
    };

    const handleOrderNow = () => {
        addToCart(product, selectedSize.label);
        router.push("/checkout");
    };

    return (
        <div className="min-h-screen bg-rama-cream">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-rama-dark/60 hover:text-rama-dark transition-colors mb-6 group"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-widest">Back to Collection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Product Image - Magic Integrated Hero Image - Zoomed Out to Fit */}
                    <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl bg-[#0f1c15] group max-h-[500px] flex items-center justify-center p-2">
                        <Image
                            src="/rama-hero-integrated_magic (1).png"
                            alt="Rama Coffee Branding"
                            fill
                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {/* Subtle dark overlay for depth */}
                        <div className="absolute inset-0 bg-black/10"></div>
                        {/* Subtle bottom fade for a premium feel */}
                        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-[#0f1c15]/40 to-transparent"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6 p-5 bg-white rounded-3xl shadow-sm border border-rama-gold/10">
                            <p className="text-rama-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-2">{product.roast}</p>
                            <h1 className="text-4xl font-black text-rama-dark mb-2 leading-tight">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-rama-gold">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-current" />)}
                                </div>
                                <span className="text-[10px] text-rama-dark/40 font-bold uppercase tracking-widest">Premium Selection</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xs font-bold text-rama-dark uppercase tracking-widest mb-2">Description</h3>
                            <p className="text-rama-dark/70 leading-relaxed text-base italic">
                                "{product.notes}"
                            </p>
                            <p className="text-rama-dark/60 mt-2 leading-relaxed text-sm">
                                {product.description}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-rama-dark uppercase tracking-widest mb-3">Packaging Choice</h3>
                            <div className="flex gap-3">
                                {PACKAGING_OPTIONS.map((size) => (
                                    <button
                                        key={size.label}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all border-2 text-sm relative overflow-hidden group/btn ${selectedSize.label === size.label
                                            ? "bg-rama-dark text-white border-rama-dark shadow-lg"
                                            : "bg-white text-rama-dark border-transparent hover:border-rama-gold/30"
                                            }`}
                                    >
                                        <span className="relative z-10">{size.label}</span>
                                        {selectedSize.label === size.label && (
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-rama-gold"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-rama-dark/10">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleOrderNow}
                                    className="flex-[2] bg-rama-gold text-rama-dark py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-rama-dark hover:text-white transition-all shadow-lg shadow-rama-gold/20 flex items-center justify-center active:scale-95"
                                >
                                    Order Now
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 bg-white text-rama-dark border-2 border-rama-dark/10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:border-rama-gold/30 hover:bg-rama-cream/50 transition-all flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    Add to Bag
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mt-8">
                            <div className="flex flex-col items-center text-center p-3 bg-white/50 rounded-xl">
                                <ShieldCheck className="h-5 w-5 text-rama-gold mb-1" />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-rama-dark/60">Quality</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 bg-white/50 rounded-xl">
                                <Truck className="h-5 w-5 text-rama-gold mb-1" />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-rama-dark/60">Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center p-3 bg-white/50 rounded-xl">
                                <ShoppingBag className="h-5 w-5 text-rama-gold mb-1" />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-rama-dark/60">Freshly Roasted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
