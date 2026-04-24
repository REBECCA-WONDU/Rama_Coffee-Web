"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import ProductsSection from "@/components/ProductsSection";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Handle hash navigation (e.g., /#shop)
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Wait a bit for the page content to be fully rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <StorySection />
      <ProductsSection />
      <MenuSection />
      <Footer />
    </main>
  );
}
