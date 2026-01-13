import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";
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
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

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

      <div className="max-w-7xl mx-auto px-6 mt-6 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-24">
          {/* LEFT — IMAGE GALLERY */}
          <div className="space-y-6 lg:sticky lg:top-24 self-start">
            <motion.div
              layoutId={`product-${product.id}`}
              className="aspect-[4/5] bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200 relative group max-h-[280px] lg:max-h-[500px] w-full mx-auto"
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
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === i
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
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h1 className="text-xl md:text-5xl font-heading font-black text-slate-900 tracking-tight mb-2 leading-[1.1]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl md:text-5xl font-bold text-slate-900 tracking-tight">
                  ₹{product.price}
                </span>
                <span className="text-sm md:text-2xl text-slate-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              </div>

              {/* Mobile Actions (Top) */}
              <div className="mt-3 mb-4 space-y-3">
                <div className="flex items-stretch gap-3">
                  <Button
                    size="lg"
                    className="flex-grow h-10 md:h-16 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs md:text-lg font-bold uppercase tracking-widest shadow-xl shadow-slate-900/10 transition-all transform active:scale-[0.99]"
                    onClick={() => {
                      addToCart(product, quantity);
                      toast.success(`Added ${quantity}x ${product.name} to cart`);
                    }}
                  >
                    Add to Order — ₹{product.price * quantity}
                  </Button>

                  {/* Quantity Selector */}
                  <div className="flex items-center bg-slate-100 rounded-xl px-1 h-10 md:h-16 border border-slate-200">
                    <button
                      onClick={decrementQuantity}
                      className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-95 transition-transform"
                    >
                      <Minus className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                    <span className="w-8 text-center text-sm md:text-lg font-bold text-slate-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 active:scale-95 transition-transform"
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 py-2 px-1 border-t border-b border-slate-50">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Sanitized</span>
                  </div>
                  <div className="w-px h-3 bg-slate-100"></div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Box className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Secure Pack</span>
                  </div>
                  <div className="w-px h-3 bg-slate-100"></div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Handmade</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mb-4">
                <CheckCircle2 className="w-3 h-3" />
                In Stock & Ready to Ship
              </div>
            </div>

            {/* Description & Features */}
            <div className="space-y-6 grow">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                {product.longDescription || product.description}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Precision Print</p>
                    <p className="text-[10px] text-slate-500">0.12mm Layer Height</p>
                  </div>
                </div>
                <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <Feather className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Lightweight</p>
                    <p className="text-[10px] text-slate-500">Premium Polymer</p>
                  </div>
                </div>
              </div>

              {/* Specs Table (Compact) */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-3 opacity-70">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold mb-0.5">
                      Material
                    </span>
                    <span className="font-medium text-slate-900 text-xs">
                      {product.specs?.material}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold mb-0.5">
                      Dimensions
                    </span>
                    <span className="font-medium text-slate-900 text-xs">
                      {product.specs?.dimensions}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold mb-0.5">
                      Weight
                    </span>
                    <span className="font-medium text-slate-900 text-xs">
                      {product.specs?.weight}
                    </span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[9px] uppercase font-bold mb-0.5">
                      Print Time
                    </span>
                    <span className="font-medium text-slate-900 text-xs">
                      {product.specs?.printTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Removed (Moved to Top) */}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */


