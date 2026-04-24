
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f1c15]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-8 text-center lg:text-left"
                    >
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-bold text-white leading-tight"
                        >
                            The Heart of <br />
                            <span className="text-rama-gold italic font-serif">Addis Coffee</span> Culture.
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-inter"
                        >
                            Experience the authentic soul of coffee in Addis Ababa. From traditional ceremonies to a modern café experience, Rama Coffee is where culture meets excellence.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex justify-center lg:justify-start pt-4"
                        >
                            <Link href="/#shop" className="bg-rama-gold text-[#0f1c15] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg">
                                View Collection <ArrowRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Seamless Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 animate-float">
                            <Image
                                src="/rama-hero-seamless.png"
                                alt="Rama Coffee"
                                width={800}
                                height={800}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle bottom fade for transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f1c15] to-transparent"></div>
        </section>
    );
}
