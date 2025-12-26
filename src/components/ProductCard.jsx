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

    // Mock data for visual requirements
    const rating = 4;
    const materials = ["PLA", "ABS", "PETG"];
    const colors = ["#000000", "#FFFFFF", "#EF4444", "#22C55E"]; // Black, White, Red, Green

    const handleIncrement = (e) => {
        e.preventDefault();
        if (quantity === 0) {
            addToCart(product);
        } else {
            updateQuantity(product.id, quantity + 1);
        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            updateQuantity(product.id, quantity - 1);
        } else {
            removeFromCart(product.id);
        }
    };

    return (
        <motion.div
            layout
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-border flex flex-col h-full hover:shadow-xl transition-all duration-300"
        >
            {/* Image Section - 1:1 Aspect Ratio */}
            <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-light p-0">
                <div className="w-full h-full relative overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Mock Rating Badge on Image */}
                <div className="absolute top-0 left-0 bg-primary text-white px-3 py-1 flex items-center gap-1 text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{rating}.0</span>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow bg-white border-t border-border">
                <div className="mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-heading font-semibold text-primary leading-tight line-clamp-1">
                            {product.name}
                        </h3>
                        <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed mb-4">
                        {product.description || "High precision 3D printed part using premium filament for durability and aesthetics."}
                    </p>

                    {/* Mock Selectors */}
                    <div className="space-y-3 mb-6">
                        {/* Materials */}
                        <div className="flex flex-wrap gap-2">
                            {materials.map(m => (
                                <span key={m} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-surface text-text-secondary border border-border hover:bg-primary hover:text-white transition-colors cursor-pointer">
                                    {m}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-border">
                    {cartItem ? (
                        <div className="flex items-center justify-between bg-surface border border-border p-1">
                            <button
                                onClick={handleDecrement}
                                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-primary text-base">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="w-10 h-10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full h-12 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 rounded-none"
                            onClick={(e) => {
                                e.preventDefault();
                                addToCart(product);
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
