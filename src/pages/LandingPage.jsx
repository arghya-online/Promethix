import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";
import { ArrowRight, MessageSquare, Printer, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { MobileFeaturedCarousel } from "@/components/MobileFeaturedCarousel";
import { LandingHero } from "@/components/LandingHero";
import { Marquee } from "@/components/Marquee";
import { ComparisonSlider } from "@/components/ComparisonSlider";

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

      {/* 2. HOW IT WORKS (Trust) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-2 block">
              FROM IDEA TO DELIVERY
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">
              Simple, smooth, and beginner-friendly.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <StepItem
              icon={<MessageSquare className="w-8 h-8" />}
              title="1. Share Your Idea"
              desc="Pick a product from our store or send your custom requirement to us on WhatsApp. You can share reference images, measurements, details, or even the STL file directly."
            />
            <StepItem
              icon={<Printer className="w-8 h-8" />}
              title="2. Design & Precision Print"
              desc="We review your requirement, design the model if needed, and 3D print it with clean detailing and proper strength."
            />
            <StepItem
              icon={<Truck className="w-8 h-8" />}
              title="3. Finish & Delivery"
              desc="We finish the print, pack it safely, and deliver it to your location."
            />
          </div>

          <p className="text-center text-slate-400 text-sm mt-12 italic mb-8">
            Custom orders are handled via WhatsApp for faster communication and better clarity.
          </p>

          <div className="text-center">
            <Link to="/custom">
              <Button className="h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg hover:shadow-xl transition-all">
                Start Custom Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
