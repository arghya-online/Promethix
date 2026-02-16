import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Minus, Plus, Share2, Heart, ChevronDown, Check, ArrowRight, Package, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { useAuth } from "../context/auth-context";
import { ENRICHED_PRODUCTS as PRODUCTS } from "@/data/products";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductCard } from "@/components/ProductCard";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, wishlist } = useAuth();

  // Cross-sell products (Same category, excluding current)
  const relatedProducts = product
    ? PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const isWishlisted = product && wishlist ? wishlist.includes(product.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = PRODUCTS.find((p) => p.id == id);
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
    } else {
      toast.error("Product not found");
      // navigate("/products");
    }
  }, [id]);

  const [realReviewCount, setRealReviewCount] = useState(0);

  useEffect(() => {
    if (!product) return;
    const q = query(collection(db, "reviews"), where("productId", "==", product.id));
    const unsubscribe = onSnapshot(q, (snap) => setRealReviewCount(snap.size));
    return () => unsubscribe();
  }, [product]);

  if (!product) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  const handleAddToCart = () => {
    if (isAdded) {
      openCart(); // Just open drawer if already added
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
    setIsAdded(true);
    openCart(); // Auto-open drawer
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-32 md:pb-20">

      {/* HEADER SPACER */}
      <div className="h-16 md:h-20" />

      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-slate-900 transition-colors">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-start">

          {/* --- LEFT COLUMN: STICKY GALLERY --- */}
          {/* Desktop: Vertical Stack / Mobile: Slider */}
          <div className="flex flex-col gap-4">
            {/* Mobile View: Main Image + Thumbnails */}
            <div className="lg:hidden flex flex-col gap-4">
              <div className="aspect-square bg-white rounded-none border border-slate-100 overflow-hidden">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images?.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(img)} className={`w-16 h-16 shrink-0 border-2 ${activeImage === img ? 'border-slate-900' : 'border-transparent'}`}>
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop View: Vertical Sticky Stack (Actually simple stack, right col is sticky) */}
            <div className="hidden lg:flex flex-col gap-6">
              {product.images?.map((img, idx) => (
                <div key={idx} className="w-full aspect-square bg-white border border-slate-100">
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: STICKY DETAILS --- */}
          <div className="lg:sticky lg:top-24 h-fit">

            {/* Header Info */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">{product.name}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-slate-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-900 ml-1">{product.rating}</span>
                  <span className="text-slate-400 text-sm">({realReviewCount} Reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-8 border-b border-slate-100 pb-8">
              {product.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 border border-slate-100">
                <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Material</span>
                <span className="font-bold text-slate-900">{product.specs?.material || "PLA Premium"}</span>
              </div>
              <div className="bg-white p-4 border border-slate-100">
                <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Dimensions</span>
                <span className="font-bold text-slate-900">{product.specs?.dimensions || "Standard"}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 h-14">
                <div className="flex items-center border border-slate-200 bg-white w-32">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
                  <span className="flex-1 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 h-[52px] text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-white ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                >
                  {isAdded ? "View Cart" : `Add to Cart - ₹${(product.price * quantity).toLocaleString()}`}
                  {isAdded && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
              <Button onClick={handleBuyNow} variant="outline" className="w-full h-14 font-bold border-slate-300">
                Buy Now
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <Package className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Secure Pack</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Share2 className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] uppercase font-bold text-slate-500">Share</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- CROSS-SELL SECTION --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-black mb-8">Frequently Bought Together</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-24 md:mt-32">
          <ProductReviews productId={product.id} />
        </div>

      </main>

      {/* --- MOBILE STICKY BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:hidden z-50 flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500 uppercase">Total</span>
          <span className="text-lg font-black text-slate-900">₹{product.price * quantity}</span>
        </div>
        <Button onClick={handleAddToCart} className="flex-1 h-12 bg-slate-900 text-white font-bold rounded-none">
          {isAdded ? "View Cart" : "Add to Cart"}
        </Button>
      </div>

    </div>
  );
}

export default ProductDetail;
