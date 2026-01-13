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
  const reviewCount = Math.floor(Math.random() * 500) + 50; // Valid use for just UI visual

  // Calculate discount percentage if original price exists
  const discount = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    )
    : 0;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col h-full bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 overflow-hidden rounded-none relative"
    >
      {/* IMAGE CONTAINER */}
      <Link
        to={`/product/${product.id}`}
        className="relative bg-slate-50 aspect-[4/5] p-3 md:p-6 flex items-center justify-center overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              toast.success(`Added ${product.name} to cart`);
            }}
            className="w-full h-11 bg-slate-900 text-white font-bold uppercase tracking-wider shadow-xl dark:hover:bg-amber-600 transition-colors rounded-sm"
          >
            Quick Add <ShoppingCart className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            {discount}% off
          </span>
        )}
      </Link>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-3 md:p-4 min-h-[120px]">
        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="hover:text-amber-600 transition-colors"
        >
          <h3 className="text-slate-900 font-bold leading-tight mb-1 text-xs md:text-base line-clamp-2 min-h-[2.5em]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-amber-500 text-[10px]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {reviewCount}
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-base align-top text-slate-700 font-medium">
              ₹
            </span>
            <span className="text-lg md:text-2xl font-bold text-slate-900 leading-none">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through decoration-slate-400">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">
            Delivery by{" "}
            <span className="text-slate-800 font-bold">Promethix3D</span>
          </p>
        </div>

        {/* Mobile Add Visible */}
        <div className="mt-3 md:hidden">
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              toast.success(`Added ${product.name} to cart`);
            }}
            className="w-full bg-slate-900 text-white font-bold h-8 text-xs uppercase tracking-wide rounded-sm"
          >
            Add
          </Button>
        </div>
      </div>
    </motion.div >
  );
}
