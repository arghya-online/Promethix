import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { MobileFeaturedCarousel } from "@/components/MobileFeaturedCarousel";
import { LandingHero } from "@/components/LandingHero";
import { Marquee } from "@/components/Marquee";
import { ComparisonSlider } from "@/components/ComparisonSlider";
import { CustomOrderSection } from "@/components/CustomOrderSection";

export function LandingPage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="w-full bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 1.5 MARQUEE */}
      <Marquee />

      {/* 2. CAD COMPARISON SLIDER */}
      <ComparisonSlider />

      {/* 2. CUSTOM ORDER SECTION (Redesigned) */}
      <CustomOrderSection />

      {/* 3. FEATURED COLLECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Trending Now
              </h2>
              <p className="text-slate-500 font-medium mb-4">Popular prints people are loving right now.<br />Explore more designs in our collection.</p>
              <div className="h-1 w-24 bg-amber-500" />
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 font-bold text-slate-900 hover:text-amber-600 transition-colors uppercase tracking-wider text-sm"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Mobile Carousel Removed in favor of Grid */}

          <div className="mt-12 text-center md:hidden">
            <Link to="/products">
              <Button
                variant="outline"
                className="w-full h-12 border-slate-900 text-slate-900 font-bold uppercase tracking-widest"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}



export default LandingPage;
