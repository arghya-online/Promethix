import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Box,
  HeartHandshake,
  Cpu,
  Feather,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-white text-slate-500">
        Product not found
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 font-sans">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Link
            to="/products"
            className="hover:text-amber-600 transition-colors"
          >
            Collection
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-amber-600">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT — IMAGE GALLERY */}
          <div className="space-y-6 sticky top-24 self-start">
            <motion.div
              layoutId={`product-${product.id}`}
              className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200 relative group"
            >
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20">
                  {discountPercent}% OFF
                </Badge>
                <Badge className="bg-white/90 backdrop-blur text-slate-900 border border-slate-200 px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Ready to Ship
                </Badge>
              </div>

              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === i
                      ? "border-amber-500 ring-2 ring-amber-100 scale-95"
                      : "border-transparent bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`View ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="flex flex-col h-full pt-4">
            {/* Header */}
            <div className="border-b border-slate-100 pb-8 mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-5xl font-bold text-slate-900 tracking-tight">
                  ₹{product.price}
                </span>
                <span className="text-2xl text-slate-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock & Ready to Ship
              </div>
            </div>

            {/* Description & Features */}
            <div className="space-y-8 grow">
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {product.longDescription || product.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <FeatureCard
                  icon={<Cpu className="w-5 h-5 text-amber-500" />}
                  title="Precision Print"
                  subtitle="0.12mm Layer Height"
                />
                <FeatureCard
                  icon={<Feather className="w-5 h-5 text-amber-500" />}
                  title="Lightweight"
                  subtitle="Premium Polymer"
                />
              </div>

              {/* Specs Table (Static Data Only) */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">
                      Material
                    </span>
                    <span className="font-medium text-slate-900">
                      {product.specs?.material}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">
                      Dimensions
                    </span>
                    <span className="font-medium text-slate-900">
                      {product.specs?.dimensions}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">
                      Weight
                    </span>
                    <span className="font-medium text-slate-900">
                      {product.specs?.weight}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-xs uppercase font-bold mb-1">
                      Print Time
                    </span>
                    <span className="font-medium text-slate-900">
                      {product.specs?.printTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 pt-8 border-t border-slate-100 space-y-6">
              <Button
                size="lg"
                className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all transform active:scale-[0.99]"
                onClick={() => addToCart(product)}
              >
                Add to Order — ₹{product.price}
              </Button>

              <div className="grid grid-cols-3 gap-4">
                <TrustItem icon={<Shield />} label="Sanitized" />
                <TrustItem icon={<Box />} label="Secure Pack" />
                <TrustItem icon={<HeartHandshake />} label="Handmade" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

function TrustItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-amber-600 hover:bg-amber-50/50 hover:border-amber-100 transition-colors">
      <div className="w-5 h-5">{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
