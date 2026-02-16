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
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-[70] flex flex-col font-sans"
                        ref={drawerRef}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-slate-900" />
                                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Your Cart <span className="text-slate-400">({cart.length})</span></h2>
                            </div>
                            <button onClick={closeCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                    <ShoppingBag className="w-16 h-16 text-slate-300 mb-4" />
                                    <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
                                    <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
                                    <Button onClick={closeCart} variant="outline" className="font-bold border-slate-300">Start Shopping</Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* Image */}
                                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{item.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1 -mt-1 -mr-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                {/* Qty Control - Touch Friendly */}
                                                <div className="flex items-center border border-slate-200 h-8 rounded-sm">
                                                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-500">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-full flex items-center justify-center hover:bg-slate-50 text-slate-500">
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">₹{item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="text-xl font-black text-slate-900">₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-slate-400 text-center">Shipping & taxes calculated at checkout.</p>
                                <Button
                                    onClick={() => { closeCart(); navigate("/cart"); }}
                                    className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                    Checkout <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
