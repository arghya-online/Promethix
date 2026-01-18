import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS, CATEGORIES } from "../data/products";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Products() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Create a URL-friendly slug from the category name for comparison
      const categorySlug = product.category.toLowerCase().replace(/ /g, "-");

      const matchesCategory = slug
        ? categorySlug === slug
        : true;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [slug, search]);

  // Stagger container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* HEADER SECTION with Ambient Background */}
      <div className="relative bg-white border-b border-slate-100 pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-50 rounded-none blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 font-heading">
            {slug ? slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "All Collections"}
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-slate-500 max-w-lg text-lg leading-relaxed">
              Explore our premium range of industrial-grade 3D printed artifacts.
              Designed for durability, optimized for performance.
            </p>

            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search catalog..."
                className="pl-11 h-12 bg-slate-100 border-transparent rounded-none text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-200 focus:shadow-lg transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Mobile Category Dropdown - Visible only on small screens */}
          <div className="md:hidden mt-12">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
              Browsing Category
            </label>
            <div className="relative">
              <select
                className="w-full h-12 pl-4 pr-10 bg-slate-100 border-transparent rounded-none text-slate-900 font-bold focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all appearance-none"
                value={slug || "all"}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "all") window.location.href = "/products";
                  else window.location.href = `/category/${val}`;
                }}
              >
                <option value="all">All Collection</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat.toLowerCase().replace(/ /g, "-")}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Desktop Filter Pills - Hidden on mobile */}
          <div className="hidden md:flex flex-wrap gap-2 mt-12">
            <Link to="/products" preventScrollReset>
              <Badge
                variant={!slug ? "default" : "outline"}
                className={`h-9 px-6 rounded-none text-xs font-bold uppercase tracking-wide transition-all ${!slug
                  ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"}`}
              >
                All Items
              </Badge>
            </Link>
            {CATEGORIES.map((cat) => {
              const catSlug = cat.toLowerCase().replace(/ /g, "-");
              const isActive = slug === catSlug;
              return (
                <Link key={cat} to={`/category/${catSlug}`} preventScrollReset>
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`h-9 px-6 rounded-none text-xs font-bold uppercase tracking-wide transition-all ${isActive
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900"}`}
                  >
                    {cat}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Showing {filteredProducts.length} Results
          </span>
        </div>

        {/* Product Grid - Staggered */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            layout
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 gap-y-8"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-none flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              We couldn't find any items matching your search. Try different keywords or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
