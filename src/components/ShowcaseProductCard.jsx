import React from "react";

export function ShowcaseProductCard({ product }) {
  return (
    <div className="group relative bg-white/80 border border-amber-900/15 hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] transition-all duration-500 flex flex-col h-full print:border-slate-200 print:shadow-none print:break-inside-avoid overflow-hidden">

      {/* Tech CAD Corner Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />

      {/* Product ID Tag (CAD blueprint detail) */}
      <span className="absolute top-3.5 left-3.5 z-10 bg-amber-50/95 backdrop-blur-md px-2 py-0.5 border border-amber-200 text-[8px] font-mono tracking-widest text-amber-800 uppercase select-none pointer-events-none">
        {product.id}
      </span>

      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-amber-50/30 overflow-hidden border-b border-amber-900/10 print:bg-white print:border-slate-200">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-103 transition-transform duration-700 ease-out print:transform-none"
          loading="lazy"
        />
        {/* Soft Luxury Overlay - hidden on print */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(245,158,11,0.06))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none print:hidden" />
      </div>

      {/* Product Details Content */}
      <div className="flex flex-col flex-grow p-4 md:p-5 bg-white/40 print:p-3 print:bg-white">
        {/* Category Label */}
        <span className="text-[9px] uppercase tracking-[0.25em] text-amber-600 mb-1.5 font-mono select-none">
          {product.category === "idols" ? "SACRED SCULPT" : "DESIGN & FAB"}
        </span>

        {/* Product Title */}
        <h3 className="font-heading text-base md:text-lg font-bold text-[#231F1C] leading-tight group-hover:text-amber-700 transition-colors duration-300 print:text-black flex-grow">
          {product.name}
        </h3>
      </div>
    </div>
  );
}
