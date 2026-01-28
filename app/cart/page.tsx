"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <main className="min-h-screen bg-[#0f1c15] text-white font-inter">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/#shop" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6 text-rama-gold" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Your Shopping <span className="text-rama-gold">Bag</span></h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-[#1a2e23] rounded-[3rem] p-12 text-center border border-white/5 shadow-2xl">
                        <div className="w-24 h-24 bg-rama-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShoppingBag className="h-12 w-12 text-rama-gold" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                        <p className="text-white/60 mb-8 max-w-md mx-auto">Explore our premium Ethiopian origin coffee collections and find your perfect roast.</p>
                        <Link href="/#shop" className="inline-block bg-rama-gold text-[#0f1c15] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-rama-gold/20">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="bg-[#1a2e23] rounded-[2.5rem] p-6 border border-white/5 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
                                    <div className="relative w-32 h-32 bg-[#0f1c15] rounded-[1.5rem] overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover scale-150"
                                        />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                                        <p className="text-rama-gold text-sm font-medium mb-4 uppercase tracking-widest">{item.size}</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center bg-[#0f1c15] rounded-full border border-white/5 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                    className="p-2 hover:text-rama-gold transition-colors"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="p-2 hover:text-rama-gold transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="p-3 text-white/30 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-black text-white sm:pr-4">
                                        {item.price * item.quantity} <span className="text-[10px] text-rama-gold uppercase align-middle ml-1">ETB</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#1a2e23] rounded-[3rem] p-8 border border-white/5 shadow-2xl sticky top-32">
                                <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-white/5">Order <span className="text-rama-gold">Summary</span></h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-white/60">
                                        <span>Subtotal ({cartCount} items)</span>
                                        <span>{cartTotal} ETB</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Delivery</span>
                                        <span className="text-rama-gold font-bold">Free</span>
                                    </div>
                                    <div className="h-px bg-white/5 my-2"></div>
                                    <div className="flex justify-between text-xl font-black uppercase">
                                        <span>Total</span>
                                        <span className="text-rama-gold">{cartTotal} ETB</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full bg-rama-gold text-[#0f1c15] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-rama-gold/20 flex items-center justify-center text-center">
                                    Proceed to Checkout
                                </Link>

                                <p className="text-center text-[10px] text-white/30 mt-6 uppercase tracking-widest leading-relaxed">
                                    Secure and premium delivery handling for the finest coffee experience.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
