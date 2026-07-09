import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS, CATEGORIES } from "../data/products";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Sparkles, Box, ArrowRight, PenTool } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShopByCategory } from "@/components/ShopByCategory";
import { CommunityHero } from "@/components/CommunityHero";
import { CustomOrderSection } from "@/components/CustomOrderSection";


export default function Products() {
  const { slug } = useParams();
  const location = useLocation();
  
  // URL Search Parameters lookup
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearch = searchParams.get("q") || "";
  
  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const allProducts = useMemo(() => PRODUCTS, []);

  const isHomePage = location.pathname === "/";

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const categorySlug = product.category.toLowerCase().replace(/ /g, "-");
      const matchesCategory = slug ? categorySlug === slug : true;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Limit to 6 products ONLY on homepage and when no search/filter is active
    if (isHomePage && !slug && !search) {
      return products.slice(0, 6);
    }
    return products;
  }, [slug, search, isHomePage, allProducts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 pb-20 font-sans relative overflow-hidden">
      {/* Subtle CAD Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

      {/* --- COMMUNITY HERO SECTION --- */}
      {isHomePage && !slug && !search && (
        <>
          <CommunityHero />
          <div className="bg-transparent py-6 text-center no-print flex justify-center">
            <Link to="/products">
              <Button className="bg-amber-500 text-white hover:bg-amber-600 font-extrabold uppercase tracking-widest text-[10px] px-8 py-3 h-12 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_5px_15px_rgba(217,119,6,0.15)] cursor-pointer border-0">
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </>
      )}

      {/* --- FILTER & SEARCH BAR (Sticky, aligned below floating nav) --- */}
      <div className="sticky top-24 z-40 w-[92%] max-w-7xl mx-auto mt-4 bg-white/95 border border-slate-100 rounded-full shadow-[0_2px_8px_rgba(9,9,11,0.01),0_16px_32px_rgba(9,9,11,0.02)] transition-all">
        <div className="px-5 h-14 md:h-16 flex items-center justify-between gap-4">

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            <Link to="/products">
              <Button variant={!slug ? "secondary" : "ghost"} className={`rounded-full text-[10px] font-bold uppercase tracking-widest h-8 px-4 ${!slug ? 'bg-zinc-950 text-white hover:bg-zinc-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                All
              </Button>
            </Link>
            {CATEGORIES.map(cat => {
              const catSlug = cat.toLowerCase().replace(/ /g, "-");
              const isSelected = slug === catSlug;
              return (
                <Link key={cat} to={`/category/${catSlug}`}>
                  <Button variant={isSelected ? "secondary" : "ghost"} className={`rounded-full text-[10px] font-bold uppercase tracking-widest h-8 px-4 transition-all ${isSelected ? 'bg-zinc-950 text-white hover:bg-zinc-900 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>
                    {cat}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="md:hidden relative w-1/2 max-w-[180px]">
            <select
              className="w-full h-9 pl-4 pr-8 bg-white border border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 appearance-none outline-none focus:border-amber-500 shadow-sm"
              value={slug || ""}
              onChange={(e) => {
                const val = e.target.value;
                window.location.href = val ? `/category/${val}` : "/products";
              }}
            >
              <option value="" className="bg-white text-slate-900">All Collection</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat.toLowerCase().replace(/ /g, "-")} className="bg-white text-slate-900">{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 transition-all rounded-full text-xs font-medium shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative z-10">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            {slug ? (
              <>
                <span className="text-slate-400 font-medium">Category /</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 font-extrabold">
                  {slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}
                </span>
              </>
            ) : (
              isHomePage ? "Featured Products" : "All Products"
            )}
          </h2>

          {/* View All Logic - Top Right */}
          {isHomePage ? (
            <Link to="/products" className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors uppercase tracking-widest pb-0.5 border-b border-transparent hover:border-amber-600">
              View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="text-xs font-bold text-slate-450 uppercase tracking-widest">{filteredProducts.length} Items</span>
          )}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center glass-panel rounded-3xl max-w-lg mx-auto border border-slate-200/50 text-slate-900">
              <Box className="w-12 h-12 text-slate-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-extrabold text-slate-800">No products found</h3>
              <p className="text-slate-500 mt-1 text-sm">Try adjusting your search query or collection filter.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HOMEPAGE BUTTONS: JUST CUSTOM DESIGN (View All is now at top) */}
        {isHomePage && !slug && !search && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 mb-8">
            <Link to="/custom">
              <Button size="lg" className="h-14 px-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Start Custom Design <PenTool className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}

      </div>

      {/* CUSTOM ORDER SECTION (Only on Homepage) */}
      {isHomePage && !slug && !search && (
        <div className="mt-20">
          <CustomOrderSection />
        </div>
      )}

    </div>
  );
}
