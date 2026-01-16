import React from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const rating = 4.8;

  // Consistent random review count
  const reviewCount = React.useMemo(() => {
    return 50 + ((typeof product.id === 'string' ? product.id.charCodeAt(0) : product.id) % 20) * 12;
  }, [product.id]);

  const discount = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
    : 0;

  return (
    <motion.div
      layout
      className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 relative isolate"
    >
      {/* FULL CARD LINK OVERLAY */}
      <Link to={`/product/${product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />

      {/* 1. SQUARE IMAGE CONTAINER */}
      <div className="relative block w-full aspect-square bg-slate-50 overflow-hidden z-10 pointer-events-none">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button (Top Right) - Pointer events allowed */}
        <button className="absolute top-2 right-2 w-6 h-6 bg-white/70 hover:bg-white backdrop-blur rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 shadow-sm pointer-events-auto z-20">
          <Star className="w-3 h-3" />
        </button>
      </div>

      {/* 2. COMPACT CONTENT */}
      <div className="flex flex-col flex-grow p-2.5 sm:p-3 pointer-events-none z-10">

        {/* Title */}
        <div className="block mb-1">
          <h3 className="text-slate-900 font-bold text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Meta Row: Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-2.5 h-2.5 text-amber-500 fill-current" />
          <span className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Bottom Row: Price & Add Button */}
        <div className="mt-auto flex items-end justify-between pt-2 border-t border-slate-50/50 pointer-events-auto relative z-20">
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black text-slate-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[9px] text-slate-400 line-through mt-0.5">₹{product.originalPrice}</span>
            )}
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              toast.success(`Added to cart`);
            }}
            className="h-7 px-3 bg-slate-900 hover:bg-black text-white text-[10px] font-bold uppercase tracking-wide rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
          >
            + Add
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
