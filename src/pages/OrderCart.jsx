import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Minus, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import AuthModal from "@/components/AuthModal";

export default function OrderCart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user: currentUser } = useAuth();
  const [notes, setNotes] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      // 1. Save Order to Firestore
      const orderData = {
        userId: currentUser.uid,
        items: cart,
        total: cartTotal,
        notes: notes,
        status: "Pending", // Pending, Processing, Shipped, Delivered, Cancelled
        createdAt: serverTimestamp(),
        paymentMethod: "WhatsApp/Pending",
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);

      // 2. Clear Cart
      clearCart();

      // 3. Redirect to WhatsApp
      const whatsappNumber = "+919832769269"; // Replace with actual number
      let message = `Hello PROMETHIX3D,\nI have placed a new order (ID: ${docRef.id.slice(0, 8)}).\n\n`;
      message += `Name: ${currentUser.displayName || "Customer"}\n`;
      message += `Email: ${currentUser.email}\n\n`;
      message += `Items:\n`;

      cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
      });

      message += `\nTotal Value: ₹${cartTotal}\n`;
      if (notes) message += `Notes: ${notes}\n`;
      message += `\nPlease guide me with payment and delivery.`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

      // 4. Redirect to Orders Page
      navigate("/orders");

    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 bg-background text-text-primary">
        <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Your cart is empty</h2>
        <p className="text-text-muted mb-8 max-w-md">
          Looks like you haven't added anything yet. Explore our collection to find something you love.
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-none px-8 bg-primary hover:bg-slate-800 text-white uppercase font-bold tracking-widest">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-bold mb-8 text-primary">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-surface border border-border relative group"
              >
                <div className="w-24 h-24 bg-surface-light overflow-hidden shrink-0 border border-border">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-primary font-heading">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-text-muted hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-primary font-medium">₹{item.price}</p>
                  <div className="text-xs text-text-secondary mt-1 uppercase tracking-wider">
                    {item.category}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border text-primary hover:bg-surface-light bg-transparent rounded-none"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-primary">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border text-primary hover:bg-surface-light bg-transparent rounded-none"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-surface p-6 border border-border space-y-4 sticky top-24">
              <h3 className="text-xl font-heading font-bold text-primary">Order Summary</h3>
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span className="text-primary font-bold">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-primary font-medium">
                    Calculated on WhatsApp
                  </span>
                </div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg text-primary">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="pt-4">
                <label className="text-sm font-medium mb-2 block text-text-secondary">
                  Order Notes (Optional)
                </label>
                <Textarea
                  placeholder="Any special instructions?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-white border-border text-primary placeholder:text-text-muted focus:border-primary rounded-none"
                />
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-lg bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-lg shadow-green-900/20 rounded-none font-bold uppercase tracking-widest"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                {currentUser ? "Place Order" : "Sign in to Order"}
              </Button>

              <p className="text-xs text-center text-text-muted mt-4">
                Secure checkout via WhatsApp. Order details will be saved to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
