import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Minus, Plus, Share2, Heart, Package, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { useAuth } from "../context/auth-context";
import { ENRICHED_PRODUCTS as PRODUCTS } from "@/data/products";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductCard } from "@/components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, wishlist } = useAuth();

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
      setIsAdded(false);
    } else {
      toast.error("Product not found");
    }
  }, [id]);

  const [realReviewCount, setRealReviewCount] = useState(0);

  useEffect(() => {
    if (!product) return;
    setRealReviewCount(Math.round((product.rating || 4.5) * 3));
  }, [product]);

  if (!product) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  const handleAddToCart = () => {
    if (isAdded) {
      openCart();
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added to cart`);
    setIsAdded(true);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#fafafb] bg-[linear-gradient(to_right,rgba(9,9,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(9,9,11,0.03)_1px,transparent_1px)] bg-[size:32px_32px] text-slate-900 font-sans pb-24 relative overflow-hidden">
      
      {/* Spacer to avoid navbar overlap */}
      <div className="h-20" />

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/category/${product.category.toLowerCase().replace(/ /g, "-")}`} className="hover:text-slate-900 transition-colors">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900">{product.name}</span>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-6 mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* --- LEFT COLUMN: COMPACT IMAGE GALLERY (Unified desktop/mobile to prevent page stretch) --- */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="aspect-square w-full max-w-[420px] mx-auto bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative group">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-102" 
              />
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar justify-center">
              {product.images?.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img)} 
                  className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden border transition-all ${
                    activeImage === img ? 'border-zinc-950 scale-102 shadow-sm' : 'border-slate-100 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: PRODUCT META & DETAILS --- */}
          <div className="lg:col-span-6 flex flex-col gap-5 lg:sticky lg:top-20">
            
            {/* Header info */}
            <div>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-55/5 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 inline-block border border-amber-500/10">
                {product.category}
              </span>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {typeof product.price === 'number' ? `₹${product.price}` : product.price}
                  </span>
                  {typeof product.originalPrice === 'number' && product.originalPrice > product.price && (
                    <>
                      <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-0.5 bg-yellow-400 text-zinc-950 px-2 py-0.5 rounded text-xs font-black shadow-sm">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Specifications Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-50/50 p-3.5 border border-slate-100 rounded-lg text-left">
                <span className="block text-[8px] font-black uppercase text-slate-400 mb-0.5">Material Specification</span>
                <span className="text-xs font-bold text-slate-700">{product.specs?.material || "PLA Premium"}</span>
              </div>
              <div className="bg-slate-50/50 p-3.5 border border-slate-100 rounded-lg text-left">
                <span className="block text-[8px] font-black uppercase text-slate-400 mb-0.5">Dimensions Scale</span>
                <span className="text-xs font-bold text-slate-700">{product.specs?.dimensions || "Standard Scale"}</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-1">
              <div className="flex gap-3">
                {/* Quantity triggers */}
                <div className="flex items-center border border-slate-200 bg-white rounded-full overflow-hidden h-10 shrink-0 w-26 shadow-sm">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-full flex items-center justify-center hover:bg-slate-50 border-0 cursor-pointer text-slate-400 hover:text-slate-900"><Minus className="w-3 h-3" /></button>
                  <span className="flex-1 text-center text-xs font-bold text-slate-700">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-full flex items-center justify-center hover:bg-slate-50 border-0 cursor-pointer text-slate-400 hover:text-slate-900"><Plus className="w-3 h-3" /></button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-10 bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-full border-0 cursor-pointer shadow-sm"
                >
                  {isAdded ? "View Cart" : "Add to Cart"}
                </Button>
              </div>

              <Button 
                onClick={handleBuyNow} 
                variant="outline" 
                className="w-full h-10 font-bold text-[10px] uppercase tracking-widest border-slate-200 text-slate-700 bg-white hover:bg-slate-50 rounded-full"
              >
                Buy Now
              </Button>
            </div>

            {/* Wishlist and Share actions */}
            <div className="flex items-center justify-center gap-6 py-2 border-t border-slate-100 text-[10px] uppercase font-bold tracking-wider text-slate-400">
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 hover:text-red-500 transition-colors border-0 bg-transparent cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
              </button>
              
              <div className="w-px h-3.5 bg-slate-200" />
              
              <button 
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  toast.success("Product link copied!");
                }}
                className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors border-0 bg-transparent cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Product</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 text-center">
              <div className="flex flex-col items-center gap-1 text-[9px] uppercase font-bold text-slate-400">
                <Package className="w-4 h-4 text-slate-400 mb-0.5" />
                <span>Secure Box Pack</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[9px] uppercase font-bold text-slate-400">
                <ShieldCheck className="w-4 h-4 text-slate-400 mb-0.5" />
                <span>Quality Tested</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-[9px] uppercase font-bold text-slate-400">
                <CheckCircle className="w-4 h-4 text-slate-400 mb-0.5" />
                <span>0.1mm Accuracy</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- CROSS-SELL SECTION (Standard E-Commerce) --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-100 pt-12">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-slate-900 mb-6">
              Frequently Bought Together
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-20 border-t border-slate-100 pt-12">
          <ProductReviews productId={product.id} />
        </div>

      </main>

      {/* --- MOBILE STICKY ACTIONS BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-150/80 p-3.5 shadow-lg md:hidden z-50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-slate-400 uppercase">Subtotal Price</span>
          <span className="text-base font-black text-slate-900 font-mono">₹{product.price * quantity}</span>
        </div>
        <Button 
          onClick={handleAddToCart} 
          className="flex-grow h-11 bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase text-[10px] tracking-wider rounded-full border-0 shadow-sm cursor-pointer"
        >
          {isAdded ? "Open Drawer" : "Add to Cart"}
        </Button>
      </div>

    </div>
  );
}

// Add simple helper for CheckCircle icon compatibility
function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default ProductDetail;
