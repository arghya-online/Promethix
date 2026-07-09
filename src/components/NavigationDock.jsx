import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/cart-context";
import { Home, ShoppingBag, Cpu, Heart, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function NavigationDock() {
  const { cart, toggleCart } = useCart();
  const location = useLocation();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Shop",
      path: "/products",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      name: "Configure",
      path: "/custom",
      icon: <Cpu className="w-5 h-5" />,
      highlight: true, // Special switch look
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
      <div className="tactile-panel px-6 py-4 flex items-center justify-between gap-3 bg-white border border-slate-200/80 shadow-lg">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                item.highlight
                  ? `w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-slate-900 bouncy-button text-white ${
                      isActive ? "bg-amber-600 shadow-[0_2px_0_0_#92400e] translate-y-0.5" : "bg-amber-500 shadow-[0_4px_0_0_#92400e]"
                    }`
                  : `w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? "recessed-well text-amber-700 font-black scale-95"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    }`
              }`}
              title={item.name}
            >
              {item.icon}
              {isActive && !item.highlight && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              )}
            </Link>
          );
        })}

        {/* Recessed well for Cart Toggle */}
        <button
          onClick={toggleCart}
          className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all border-0 cursor-pointer"
          title="Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-white font-black text-[9px] rounded-full border border-white shadow-sm">
              {cartCount}
            </Badge>
          )}
        </button>
      </div>
    </div>
  );
}

export default NavigationDock;
