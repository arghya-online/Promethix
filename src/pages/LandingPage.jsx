import React from "react";
import heroImage from "../assets/heroImage.png";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { ChevronDown, ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { InfiniteCarousel } from "@/components/InfiniteCarousel";
import { ProductCard } from "@/components/ProductCard";

export function LandingPage() {
  const materials = [
    {
      name: "PLA+",
      properties: "Bioplastic, High Detail",
      color: "bg-emerald-500",
    },
    {
      name: "ABS",
      properties: "Impact Resistant, Tough",
      color: "bg-orange-500",
    },
    { name: "PETG", properties: "Chemical Resistant", color: "bg-blue-500" },
    {
      name: "TPU",
      properties: "Flexible, Rubber-like",
      color: "bg-purple-500",
    },
  ];

  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main className="relative w-full overflow-hidden bg-background text-text-primary">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border text-xs font-bold text-primary tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-primary" /> Precision Engineering
            </div>

            <h1 className="text-5xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight text-primary">
              Imagine. <br />
              <span className="text-text-secondary">Create.</span> <br />
              <span className="opacity-80">Print.</span>
            </h1>

            <p className="text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Transforming digital dreams into tangible reality. Promethix3D delivers industrial-grade 3D printed artifacts with unmatched precision and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-slate-800 text-white shadow-xl shadow-primary/20 rounded-none uppercase tracking-wider font-bold">
                  Start Exploring
                </Button>
              </Link>
              <Link to="/custom">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-border bg-transparent hover:bg-surface text-primary rounded-none uppercase tracking-wider font-bold">
                  Custom Project
                </Button>
              </Link>
            </div>

            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-text-muted">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Advanced Materials</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden border border-border shadow-2xl bg-white">
              {/* Placeholder for a cool hero visual, keeping the image for now but styled better */}
              <img src={heroImage} alt="3D Printing Hero" className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute top-4 left-4 w-full h-full border border-border -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted"
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </section>

      {/* Infinite Carousel Section */}
      <section className="border-y border-border bg-surface-light">
        <div className="py-4 text-center">
          <p className="text-sm font-bold text-text-muted tracking-[0.2em] uppercase">Trusted by Makers & Engineers</p>
        </div>
        <InfiniteCarousel />
      </section>

      {/* Material Capabilities Section */}
      <section className="py-24 bg-white text-text-primary overflow-hidden relative border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">Material Capabilities</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Choose the perfect polymer for your specific engineering
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((mat) => (
              <div
                key={mat.name}
                className="bg-surface border border-border text-primary hover:border-text-primary transition-colors p-8 group"
              >
                <div className={`w-12 h-1 mb-6 ${mat.color}`} />
                <h3 className="text-xl font-heading font-bold mb-2 uppercase tracking-wide">{mat.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{mat.properties}</p>
                <div className="w-8 h-8 flex items-center justify-center bg-white border border-border group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-surface-light relative border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-heading font-bold text-primary mb-2">Featured Collection</h2>
              <p className="text-text-secondary">Curated selection of our finest prints.</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-primary border-b border-primary hover:text-text-secondary hover:border-text-secondary transition-colors gap-2 font-bold uppercase text-sm tracking-widest pb-1">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/products">
              <Button variant="outline" className="w-full border-border text-primary rounded-none uppercase font-bold">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner / CTA */}
      <section className="py-32 relative overflow-hidden bg-primary text-white">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6">Ready to print your legacy?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
            Whether it's a single prototype or a batch of 1000 units, Promethix3D has the capacity and quality you need.
          </p>
          <Link to="/custom">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-primary hover:bg-slate-200 rounded-none font-bold uppercase tracking-widest">
              Start Custom Order
            </Button>
          </Link>
        </div>
      </section>

    </main>
  );
}

export default LandingPage;
