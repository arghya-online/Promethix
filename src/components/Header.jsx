import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Logo from "../assets/PromethixLogo.png";
import { useCart } from "@/context/cart-context";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

export function Header() {
  const { cart, toggleCart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(headerSearch)}`);
  };

  const links = [
    { name: "Products", path: "/products" },
    { name: "Showcase", path: "/showcase" },
    { name: "Custom Print", path: "/custom" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={Logo}
              alt="PROMETHIX3D Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-[15px] font-black tracking-tight text-zinc-950 font-heading">
              PROMETHIX3D
            </span>
          </Link>

          {/* Search Input (boAt Style) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative flex-1 max-w-md mx-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder='Search "Gifts", "Vases", "Custom" ...'
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-9.5 bg-slate-50 border border-slate-200 focus:bg-white text-xs font-medium rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.015)] outline-none"
            />
          </form>

          {/* Nav Links & Cart */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            
            {/* Desktop Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[11px] font-bold uppercase tracking-[0.1em] px-3.5 py-2 rounded-full transition-colors ${
                      isActive 
                        ? "text-amber-700 font-extrabold bg-amber-50" 
                        : "text-zinc-650 hover:text-zinc-950 hover:bg-zinc-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="h-4 w-px bg-zinc-200 hidden lg:block" />

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative text-zinc-650 hover:text-zinc-950 hover:bg-zinc-50 rounded-full h-9 w-9"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4.5 w-4.5 flex items-center justify-center p-0 bg-amber-500 text-white font-extrabold text-[8px] rounded-full border border-white">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-zinc-650 hover:text-zinc-950 hover:bg-zinc-100/50 rounded-full h-9 w-9 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-4.5 h-4.5" />
            </Button>

          </div>
        </div>

        {/* Mobile Search Bar Row */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder='Search products, categories ...'
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-9 bg-slate-50 border border-slate-200 text-xs font-medium rounded-full outline-none"
            />
          </form>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-55 bg-black/25 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 z-60 bg-white p-6 lg:hidden w-3/4 max-w-xs shadow-2xl border-l border-zinc-100 flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-black tracking-tight text-zinc-950 font-heading">
                  PROMETHIX3D
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-550 hover:text-zinc-900 rounded-full hover:bg-zinc-100/50 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <nav className="flex flex-col gap-5 flex-grow">
                {links.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-xs font-bold uppercase tracking-[0.1em] transition-colors border-b border-zinc-100 pb-3 flex items-center justify-between ${
                        isActive ? "text-amber-700 font-extrabold" : "text-zinc-500 hover:text-zinc-950"
                      }`
                    }
                  >
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-zinc-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    toggleCart();
                  }}
                  className="text-xs font-bold uppercase tracking-[0.1em] flex items-center gap-3 text-zinc-550 hover:text-zinc-950 w-full text-left py-2 border-0 cursor-pointer bg-transparent"
                >
                  <ShoppingBag className="w-4.5 h-4.5 text-zinc-550" /> 
                  <span>Open Cart Drawer ({cartCount})</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
