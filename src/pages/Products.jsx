import React, { useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");

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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">

      {/* --- COMMUNITY HERO SECTION --- */}
      {isHomePage && !slug && !search && (
        <CommunityHero />
      )}

      {/* --- FILTER & SEARCH BAR (Sticky) --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">

          {/* Desktop Categories */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar">
            <Link to="/products">
              <Button variant={!slug ? "secondary" : "ghost"} className="rounded-full text-xs font-bold uppercase tracking-wide h-9">
                All
              </Button>
            </Link>
            {CATEGORIES.map(cat => {
              const catSlug = cat.toLowerCase().replace(/ /g, "-");
              return (
                <Link key={cat} to={`/category/${catSlug}`}>
                  <Button variant={slug === catSlug ? "secondary" : "ghost"} className={`rounded-full text-xs font-bold uppercase tracking-wide h-9 ${slug === catSlug ? 'bg-slate-900 text-white hover:bg-slate-800' : 'text-slate-500'}`}>
                    {cat}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="md:hidden relative w-1/2 max-w-[180px]">
            <select
              className="w-full h-10 pl-3 pr-8 bg-slate-100 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-900 appearance-none focus:ring-2 focus:ring-slate-900 outline-none"
              value={slug || ""}
              onChange={(e) => {
                const val = e.target.value;
                window.location.href = val ? `/category/${val}` : "/products";
              }}
            >
              <option value="">All Collection</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat.toLowerCase().replace(/ /g, "-")}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
          </div>

          {/* Search */}
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-slate-100 border-transparent focus:bg-white transition-all rounded-full text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            {slug ? (
              <>
                <span className="text-slate-400 font-normal">Category:</span>
                {slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")}
              </>
            ) : (
              isHomePage ? "Featured Products" : "All Products"
            )}
          </h2>

          {/* View All Logic - Top Right */}
          {isHomePage ? (
            <Link to="/products" className="group flex items-center gap-2 text-xs md:text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors uppercase tracking-widest border-b border-transparent hover:border-amber-600 pb-0.5">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredProducts.length} Items</span>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
              <Box className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No products found</h3>
              <p className="text-slate-500">Try adjusting your search or category.</p>
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
