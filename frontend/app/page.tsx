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
    // If the page is refreshed, ensure we are at the top and hash is cleared
    if (typeof window !== "undefined") {
      const perfEntries = performance.getEntriesByType("navigation");
      if (perfEntries.length > 0 && (perfEntries[0] as any).type === "reload") {
        window.scrollTo(0, 0);
        router.replace("/");
      }
    }
  }, [router]);

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
