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
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group flex flex-col h-full bg-white rounded-none overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative isolate"
    >
      {/* FULL CARD LINK OVERLAY */}
      <Link to={`/product/${product.id}`} className="absolute inset-0 z-0 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-none" aria-label={`View ${product.name}`} />

      {/* 1. SQUARE IMAGE CONTAINER */}
      <div className="relative block w-full aspect-square bg-slate-50 overflow-hidden z-10 pointer-events-none">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist Button (Top Right) - Pointer events allowed */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white backdrop-blur rounded-none flex items-center justify-center text-slate-400 hover:text-red-500 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 shadow-md hover:scale-110 pointer-events-auto z-20">
          <Star className="w-4 h-4" />
        </button>
      </div>

      {/* 2. COMPACT CONTENT */}
      <div className="flex flex-col flex-grow p-3 sm:p-4 pointer-events-none z-10 bg-white">

        {/* Meta Row: Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-none text-[10px] font-bold text-amber-600">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{rating}</span>
          </div>
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-none">-{discount}% OFF</span>
          )}
        </div>

        {/* Title */}
        <div className="block mb-1">
          <h3 className="text-slate-900 font-bold text-sm leading-tight line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Bottom Row: Price & Add Button */}
        <div className="mt-auto flex items-end justify-between pt-3 pointer-events-auto relative z-20">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black text-slate-900 tracking-tight">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">₹{product.originalPrice}</span>
            )}
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              toast.success(`Added to cart`, {
                description: `${product.name} is in your cart.`
              });
            }}
            className="h-9 px-4 bg-slate-100 hover:bg-slate-900 text-slate-900 hover:text-white text-xs font-bold uppercase tracking-wider rounded-none shadow-none hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            Add <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
}
