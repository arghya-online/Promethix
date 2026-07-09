import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import { Heart, Star, Share2 } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, wishlist } = useAuth();

  const isWishlisted = wishlist && wishlist.includes(product.id);
  const rating = product.rating || "4.8"; // Default rating if missing
  const discount = product.discount || null;

  return (
    <div className="group relative clean-tech-card overflow-hidden flex flex-col h-full border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl">
      <Link to={`/product/${product.id}`} className="relative block h-40 md:h-52 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full relative z-10"
          loading="lazy"
        />
        {/* Secondary Image on Hover */}
        {product.images && product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
            loading="lazy"
          />
        )}
        {product.badge && (
          <div className="absolute top-2 left-2 z-20 bg-zinc-950 text-white text-[7px] uppercase font-bold px-1.5 py-0.5 rounded">
            {product.badge}
          </div>
        )}

        {/* Rating Star Badge Overlay (boAt Style) */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-0.5 bg-yellow-400 text-zinc-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
          <span>★</span>
          <span>{rating}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-3 relative z-20 border-t border-slate-50">
        
        {/* Category tag */}
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="block mb-2 flex-grow">
          <h3 className="font-bold text-slate-800 text-xs md:text-sm leading-snug hover:text-amber-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price Tag Row (boAt Style) */}
        <div className="mt-auto pt-2 border-t border-slate-50 flex flex-wrap items-baseline gap-1.5">
          <span className="font-mono text-xs md:text-sm font-black text-slate-900">
            {typeof product.price === 'number' ? `₹${product.price}` : product.price}
          </span>
          {typeof product.originalPrice === 'number' && product.originalPrice > product.price && (
            <>
              <span className="text-[9px] text-slate-400 line-through">₹{product.originalPrice}</span>
              <span className="text-[8px] font-bold text-emerald-600">
                ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off)
              </span>
            </>
          )}
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-slate-500 hover:text-red-500 transition-colors z-20 shadow-sm border border-slate-100 cursor-pointer"
        >
          <Heart className={`w-3 h-3 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Full-width Add Button */}
        <Button
          size="sm"
          className="h-8 w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-[9px] rounded-full transition-colors mt-3.5 flex items-center justify-center gap-1 border-0 cursor-pointer shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
            openCart();
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </Button>

      </div>
    </div>
  );
}
