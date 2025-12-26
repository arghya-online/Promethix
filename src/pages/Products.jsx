import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

export default function Products() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = slug
        ? product.category.toLowerCase().replace(/ /g, "-") === slug
        : true;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [slug, search]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold tracking-tight text-white">
              {slug ? slug.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") : "All Products"}
            </h1>
            <p className="text-text-muted">
              {filteredProducts.length} items found
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Search products..."
              className="pl-9 bg-surface border-border text-white placeholder:text-text-muted focus:border-primary focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Link to="/products">
            <Badge
              variant={!slug ? "default" : "outline"}
              className={`cursor - pointer ${!slug ? "bg-primary text-white hover:bg-blue-600" : "text-text-secondary border-border hover:text-white hover:bg-surface-light"} `}
            >
              All
            </Badge>
          </Link>
          {CATEGORIES.map((cat) => {
            const catSlug = cat.toLowerCase().replace(/ /g, "-");
            const isActive = slug === catSlug;
            return (
              <Link key={cat} to={`/ category / ${catSlug} `}>
                <Badge
                  variant={isActive ? "default" : "outline"}
                  className={`cursor - pointer transition - colors ${isActive ? "bg-primary text-white hover:bg-blue-600" : "text-text-secondary border-border hover:text-white hover:bg-surface-light"} `}
                >
                  {cat}
                </Badge>
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-text-muted">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
