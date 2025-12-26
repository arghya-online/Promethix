import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "../assets/PromethixLogo.png";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "@/context/cart-context";

function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Custom", path: "/custom" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={Logo}
              alt="Promethix Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-heading font-bold tracking-tight text-black hidden sm:block">
              Promethix <span className="text-primary">3D</span>
            </span>
          </Link>

          {/* Center: Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${isActive
                    ? "text-primary font-semibold"
                    : "text-text-secondary"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Cart & Auth */}
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-text-secondary hover:text-white hover:bg-white/10"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-[10px] rounded-none ring-2 ring-background">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-slate-200 font-medium"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-primary/20",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-text-secondary"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-60 bg-background border-l border-white/10 p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-heading font-bold text-black">
                Promethix3D
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6 text-text-secondary" />
              </Button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-2xl font-heading font-medium transition-colors ${isActive ? "text-primary" : "text-text-secondary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
