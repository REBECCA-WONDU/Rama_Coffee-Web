"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const success = login(email);
        if (!success) {
            setError("No account found with this email. Please sign up first.");
        }
    };

    return (
        <main className="min-h-screen bg-[#0f1c15] text-white font-inter flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
                <div className="max-w-md w-full bg-[#1a2e23] rounded-[3rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-rama-gold/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-rama-gold hover:text-white transition-colors mb-6 group">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Back to Gallery</span>
                        </Link>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Welcome <span className="text-rama-gold">Back</span></h1>
                        <p className="text-white/40 text-xs uppercase tracking-[0.2em]">Log in to your premium coffee experience</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase tracking-widest font-bold p-4 rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rama-gold/50" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-[#0f1c15] border border-white/5 rounded-2xl pl-12 pr-4 py-5 focus:border-rama-gold outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rama-gold/50" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0f1c15] border border-white/5 rounded-2xl pl-12 pr-4 py-5 focus:border-rama-gold outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-rama-gold text-[#0f1c15] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-[1.02] transition-all shadow-xl shadow-rama-gold/20 flex items-center justify-center mt-4">
                            Log In
                        </button>
                    </form>

                    <div className="mt-10 text-center relative z-10">
                        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">New to Rama Coffee?</p>
                        <Link href="/signup" className="text-rama-gold font-black text-sm uppercase tracking-widest hover:text-white transition-colors">
                            Create a Free Account
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
