import React, { useState, useEffect } from "react";
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
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { useCart } from "@/context/cart-context";

function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Custom", path: "/custom" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="sticky top-0 z-50 w-full border-b border-border bg-white text-primary"
      >
        <div className="container mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={Logo}
              alt="Promethix Logo"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-black tracking-tighter text-black hidden sm:block font-heading">
              PROMETHIX
            </span>
          </Link>

          {/* Center: Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-bold uppercase tracking-wider transition-colors hover:text-amber-600 ${
                    isActive ? "text-black" : "text-slate-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right: Cart & Auth */}
          <div className="flex items-center gap-6">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-black hover:bg-slate-100"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-amber-500 text-black font-bold text-[10px] rounded-full border-2 border-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="bg-black text-white px-8 font-bold uppercase tracking-wider hover:bg-zinc-800 rounded-none h-12 hidden sm:flex"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 border-2 border-slate-100 ring-2 ring-white",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu Trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-black"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-60 bg-white p-6 md:hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-2xl font-black font-heading tracking-tighter text-black">
                PROMETHIX
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8 text-black" />
              </Button>
            </div>
            <nav className="flex flex-col gap-8">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-4xl font-black font-heading transition-colors ${
                      isActive ? "text-amber-500" : "text-black"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold flex items-center gap-4 text-slate-600 mb-6"
                >
                  <ShoppingBag className="w-6 h-6" /> Cart ({cartCount})
                </Link>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="w-full h-14 text-xl font-bold bg-black text-white uppercase rounded-none">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
