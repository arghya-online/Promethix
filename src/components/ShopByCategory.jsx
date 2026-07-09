import React from "react";
import { Link } from "react-router-dom";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";

export function ShopByCategory() {
  // Extract unique categories and representative image for each
  const categories = [...new Set(PRODUCTS.map(p => p.category))].map(category => {
    const product = PRODUCTS.find(p => p.category === category);
    return {
      name: category,
      image: product?.image
    };
  });

  return (
    <section className="py-10 bg-slate-50/60 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] border-b border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title */}
        <div className="text-center md:text-left mb-6">
          <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase">
            Shop by Categories
          </h2>
        </div>

        {/* Circular Bubbles Row (boAt Style) */}
        <div className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar py-1 justify-start md:justify-center px-1">
          {categories.map((cat, idx) => {
            const catSlug = cat.name.toLowerCase().replace(/ /g, "-");
            return (
              <Link
                key={idx}
                to={`/category/${catSlug}`}
                className="group flex flex-col items-center shrink-0"
              >
                {/* Circle Bubble Image */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-slate-100 group-hover:border-zinc-950 transition-colors shadow-sm bg-slate-50 flex items-center justify-center p-0.5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                
                {/* Text Label Below Circle */}
                <span className="mt-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-zinc-950 text-center transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ShopByCategory;
