import React from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const rating = 4;

  const handleIncrement = (e) => {
    e.preventDefault();
    if (quantity === 0) addToCart(product);
    else updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) updateQuantity(product.id, quantity - 1);
    else removeFromCart(product.id);
  };

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.97 }}
      className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white"
    >
      {/* IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-[4/3] sm:aspect-square bg-zinc-100"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-semibold text-white">
          <Star className="h-3 w-3 fill-white" />
          {rating}.0
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex grow flex-col px-3 py-2">
        {/* Name */}
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900">
          {product.name}
        </h3>

        {/* View Details Link */}
        <div className="mb-2">
          <Link to={`/product/${product.id}`} className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 hover:text-black transition-colors">
            View Details
          </Link>
        </div>

        {/* Price */}
        <span className="mt-1 text-sm font-bold text-black">
          ₹{product.price}
        </span>

        {/* CTA */}
        <div className="mt-auto pt-2">
          {cartItem ? (
            <div className="flex items-center justify-between rounded-md border border-zinc-300 px-2 py-1">
              <button
                onClick={handleDecrement}
                className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300 text-zinc-700"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="text-sm font-semibold">{quantity}</span>

              <button
                onClick={handleIncrement}
                className="flex h-7 w-7 items-center justify-center rounded border border-zinc-300 text-zinc-700"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="h-9 w-full rounded-md bg-black text-xs font-semibold text-white"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
