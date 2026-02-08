import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import { useAuth } from "../context/auth-context";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useAuth();

  const isWishlisted = wishlist && wishlist.includes(product.id);
  const rating = product.rating || "4.8"; // Default rating if missing
  const discount = product.discount || null;

  return (
    <div className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="relative block h-64 overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-slate-100 animate-pulse" />
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 relative z-10"
          loading="lazy"
        />
        {product.badge && (
          <div className="absolute top-2 left-2 z-20 bg-slate-900 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest">
            {product.badge}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </Link>

      {/* Wishlist Button - Absolute Positioned */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm text-slate-400 hover:text-red-500 transition-all z-20 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
      </button>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 bg-white relative z-20">

        {/* Meta Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-sm text-[10px] font-bold text-amber-600">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{rating}</span>
          </div>
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <Link to={`/product/${product.id}`} className="block mb-2 flex-grow">
          <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price & Action */}
        <div className="mt-auto flex items-end justify-between pt-2 border-t border-slate-50">
          <div className="flex flex-col leading-none">
            <span className="font-mono text-lg font-bold text-slate-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">₹{product.originalPrice}</span>
            )}
          </div>
          <Button
            size="sm"
            className="rounded-full px-4 font-bold uppercase text-[10px] tracking-wider h-8 bg-slate-900 hover:bg-amber-500 hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast.success("Added to cart");
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
