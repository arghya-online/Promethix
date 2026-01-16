import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";
import { ArrowRight, Upload, Printer, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { MobileFeaturedCarousel } from "@/components/MobileFeaturedCarousel";
import { LandingHero } from "@/components/LandingHero";

export function LandingPage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="w-full bg-white text-slate-900 font-sans">
      {/* 1. HERO SECTION */}
      <LandingHero />

      {/* 2. HOW IT WORKS (Trust) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-2 block">
              Simple Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900">
              From File to Physical
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <StepItem
              icon={<Upload className="w-8 h-8" />}
              title="1. Upload or Choose"
              desc="Select from our curated collection or upload your custom STL file."
            />
            <StepItem
              icon={<Printer className="w-8 h-8" />}
              title="2. Precision Print"
              desc="We manufacture using industrial PLA+, PETG, and Resin printers."
            />
            <StepItem
              icon={<Truck className="w-8 h-8" />}
              title="3. Fast Delivery"
              desc="Securely packed and shipped to your doorstep within 5-7 days."
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                Trending Now
              </h2>
              <div className="h-1 w-24 bg-amber-500" />
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 font-bold text-slate-900 hover:text-amber-600 transition-colors uppercase tracking-wider text-sm"
            >
              View Full Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* MOBILE CAROUSEL (GSAP) */}
          <div className="md:hidden -mx-6">
            <MobileFeaturedCarousel products={featuredProducts} />
          </div>

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

      {/* 4. CTA BANNER */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight">
            Got a custom idea?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            We accept custom STL files for printing. Get a quote instantly for
            your unique project.
          </p>
          <Link to="/custom">
            <Button className="h-16 px-12 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-lg rounded-sm">
              Start Custom Orderhe
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

function StepItem({ icon, title, desc }) {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 mx-auto bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:border-amber-500 transition-all duration-300 shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

export default LandingPage;
