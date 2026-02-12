"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, Coffee, History, Settings, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
    const { user, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#0f1c15] text-white font-inter">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#1a2e23] rounded-[3rem] p-10 border border-white/5 shadow-2xl text-center">
                            <div className="w-24 h-24 bg-rama-gold rounded-full flex items-center justify-center mx-auto mb-6 text-[#0f1c15] text-4xl font-black">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-1">{user.name}</h1>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-8">{user.email}</p>

                            <button
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 py-4 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest border border-white/5"
                            >
                                <LogOut className="h-5 w-5" />
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3 space-y-8">
                        <div className="bg-[#1a2e23] rounded-[3rem] p-10 border border-white/5 shadow-2xl">
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                                <History className="h-6 w-6 text-rama-gold" /> Order History
                            </h2>
                            <div className="text-center py-10">
                                <Coffee className="h-12 w-12 text-white/5 mx-auto mb-4" />
                                <p className="text-white/30 text-sm italic">You haven't placed any orders yet. Fresh beans are waiting!</p>
                                <Link href="/#shop" className="inline-block text-rama-gold font-bold text-xs uppercase tracking-widest mt-6 hover:text-white transition-colors">
                                    Browse Collection
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Personal Info", desc: "Manage your email and phone", icon: User },
                                { title: "Settings", desc: "Preferences and accessibility", icon: Settings },
                            ].map((item) => (
                                <button key={item.title} className="bg-[#1a2e23] rounded-[2.5rem] p-8 border border-white/5 shadow-xl hover:border-rama-gold/30 transition-all text-left flex justify-between items-center group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-[#0f1c15] rounded-2xl flex items-center justify-center">
                                            <item.icon className="h-6 w-6 text-rama-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-sm uppercase tracking-widest">{item.title}</h3>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-white/10 group-hover:text-rama-gold transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
