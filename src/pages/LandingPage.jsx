import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { LandingHero } from "@/components/LandingHero";
import { Marquee } from "@/components/Marquee";
import { CustomOrderSection } from "@/components/CustomOrderSection";
import { ShopByCategory } from "@/components/ShopByCategory";
import { motion } from "framer-motion";

export function LandingPage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="w-full bg-transparent text-slate-900 font-sans relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 1.8 SHOP BY CATEGORY */}
      <ShopByCategory />

      {/* 2. TRENDING NOW */}
      <section className="py-16 md:py-20 bg-[#fafafb] bg-[linear-gradient(to_right,rgba(9,9,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(9,9,11,0.03)_1px,transparent_1px)] bg-[size:32px_32px] border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Trending Now
              </h2>
              <p className="text-slate-500 font-medium mb-4">
                Popular prints people are loving right now.<br />Explore more designs in our collection.
              </p>
              <div className="h-1 w-20 bg-slate-900 border-b border-slate-950 mt-1" />
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 font-bold text-slate-600 hover:text-amber-700 transition-colors uppercase tracking-widest text-xs"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* PRODUCT GRID - Staggered Motion */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08
                }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {featuredProducts.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/products">
              <Button
                variant="outline"
                className="w-full h-12 border border-slate-200 text-slate-800 font-black uppercase tracking-widest bg-white hover:bg-slate-50 rounded-full"
              >
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5 MARQUEE */}
      <Marquee />

      {/* 3. CUSTOM ORDER SECTION */}
      <CustomOrderSection />

    </main>
  );
}

export default LandingPage;
