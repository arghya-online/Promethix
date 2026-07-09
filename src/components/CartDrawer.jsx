import React, { useRef, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CartDrawer() {
    const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();
    const drawerRef = useRef(null);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") closeCart();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeCart]);

    // Lock body scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-slate-900/10 z-[60]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 250 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-xl z-[70] flex flex-col font-sans border-l border-slate-100"
                        ref={drawerRef}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4.5 border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-4.5 h-4.5 text-amber-600" />
                                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Your Cart <span className="text-slate-400">({cart.length})</span></h2>
                            </div>
                            <button onClick={closeCart} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-950 border-0 cursor-pointer">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                                    <ShoppingBag className="w-12 h-12 text-slate-350 mb-3" />
                                    <p className="text-sm font-bold text-slate-900">Your cart is empty</p>
                                    <p className="text-[11px] text-slate-450 mb-4">No items added to check yet.</p>
                                    <Button onClick={closeCart} variant="outline" className="font-bold uppercase text-[9px] tracking-widest border border-slate-200 text-slate-700 rounded-full bg-white hover:bg-slate-50">Start Shopping</Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                        {/* Image */}
                                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1 -mt-1 -mr-1 transition-colors border-0 cursor-pointer">
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                                <p className="text-[8px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Qty Control */}
                                                <div className="flex items-center border border-slate-200 h-7 rounded-full bg-slate-50 overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]">
                                                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-7 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border-0 cursor-pointer">
                                                        <Minus className="w-2.5 h-2.5" />
                                                    </button>
                                                    <span className="w-7 text-center text-xs font-bold text-slate-700">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border-0 cursor-pointer">
                                                        <Plus className="w-2.5 h-2.5" />
                                                    </button>
                                                </div>
                                                <span className="font-mono text-amber-700 font-bold text-xs">
                                                    {typeof item.price === 'number' ? `₹${item.price * item.quantity}` : item.price}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest">Subtotal</span>
                                    <span className="text-lg font-black text-amber-700 font-mono">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-[9px] text-slate-400 text-center font-medium">Shipping computed at next steps.</p>
                                <Button
                                    onClick={() => { closeCart(); navigate("/cart"); }}
                                    className="w-full h-11 text-white font-bold uppercase tracking-widest text-xs shadow-sm bg-zinc-950 hover:bg-zinc-900 transition-all flex items-center justify-center gap-2 rounded-full border-0 cursor-pointer"
                                >
                                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
