"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Truck, ShieldCheck, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [isOrdered, setIsOrdered] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
    }, [isAuthenticated, router]);

    const handleCompleteOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOrdered(true);
        clearCart();
    };

    if (isOrdered) {
        return (
            <main className="min-h-screen bg-[#0f1c15] text-white font-inter flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center px-4 pt-20">
                    <div className="max-w-md w-full bg-[#1a2e23] rounded-[3rem] p-12 text-center border border-white/5 shadow-2xl">
                        <div className="w-24 h-24 bg-rama-gold rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle className="h-12 w-12 text-[#0f1c15]" />
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Order <span className="text-rama-gold">Placed!</span></h1>
                        <p className="text-white/60 mb-8">Thank you for choosing Rama Coffee. Your premium beans are being prepared for delivery.</p>
                        <Link href="/" className="inline-block bg-rama-gold text-[#0f1c15] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-rama-gold/20">
                            Back to Home
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f1c15] text-white font-inter">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/cart" className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6 text-rama-gold" />
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Secure <span className="text-rama-gold">Checkout</span></h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Delivery Info */}
                    <div className="bg-[#1a2e23] rounded-[3rem] p-10 border border-white/5 shadow-2xl">
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                            <Truck className="h-6 w-6 text-rama-gold" /> Delivery Details
                        </h2>

                        <form onSubmit={handleCompleteOrder} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                                    <input required type="text" placeholder="John Doe" className="w-full bg-[#0f1c15] border border-white/5 rounded-xl px-4 py-4 focus:border-rama-gold outline-none transition-all text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Phone Number</label>
                                    <input required type="tel" placeholder="+251 ..." className="w-full bg-[#0f1c15] border border-white/5 rounded-xl px-4 py-4 focus:border-rama-gold outline-none transition-all text-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Delivery Address</label>
                                <textarea required rows={3} placeholder="Your address in Addis Ababa..." className="w-full bg-[#0f1c15] border border-white/5 rounded-xl px-4 py-4 focus:border-rama-gold outline-none transition-all text-sm resize-none"></textarea>
                            </div>

                            <div className="pt-4 space-y-4">
                                <h3 className="text-lg font-bold flex items-center gap-3">
                                    <CreditCard className="h-5 w-5 text-rama-gold" /> Payment Method
                                </h3>
                                <div className="bg-[#0f1c15] border border-rama-gold/30 rounded-2xl p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-rama-gold" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Delivery</p>
                                            <p className="text-[10px] text-white/30 uppercase tracking-widest">Pay when you receive</p>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-rama-gold flex items-center justify-center">
                                        <div className="w-3 h-3 bg-rama-gold rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-rama-gold text-[#0f1c15] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-rama-gold/20 flex items-center justify-center mt-8">
                                Complete Order
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sticky */}
                    <div className="bg-[#1a2e23] rounded-[3rem] p-8 border border-white/5 shadow-2xl lg:sticky lg:top-32">
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-white/5">Order <span className="text-rama-gold">Review</span></h2>

                        <div className="max-h-[300px] overflow-y-auto space-y-6 mb-8 pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center bg-[#0f1c15]/50 p-4 rounded-2xl border border-white/5">
                                    <div className="flex gap-4 items-center">
                                        <span className="w-8 h-8 bg-rama-gold/10 text-rama-gold rounded-full flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                                        <div>
                                            <p className="font-bold text-sm">{item.name}</p>
                                            <p className="text-[10px] text-rama-gold uppercase tracking-widest">{item.size}</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-sm">{item.price * item.quantity} ETB</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 mb-4">
                            <div className="flex justify-between text-xl font-black uppercase">
                                <span>Total to Pay</span>
                                <span className="text-rama-gold">{cartTotal} ETB</span>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-3 text-white/40">
                                <ShieldCheck className="h-4 w-4 text-rama-gold" />
                                <span className="text-[10px] uppercase tracking-widest">Quality Guaranteed</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40">
                                <Truck className="h-4 w-4 text-rama-gold" />
                                <span className="text-[10px] uppercase tracking-widest">Premium Fresh Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
