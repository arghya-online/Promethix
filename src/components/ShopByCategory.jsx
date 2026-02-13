import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ENRICHED_PRODUCTS as PRODUCTS } from "../data/products";

export function ShopByCategory() {
    // Extract unique categories and find a representative image for each
    const categories = [...new Set(PRODUCTS.map(p => p.category))].map(category => {
        const product = PRODUCTS.find(p => p.category === category);
        return {
            name: category,
            image: product?.image,
            count: PRODUCTS.filter(p => p.category === category).length
        };
    });

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Shop by Collection</h2>
                        <p className="text-slate-500">Find something awesome for your room.</p>
                    </div>
                    <Link to="/products" className="hidden md:flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 transition-colors">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/products?category=${cat.name}`}
                            className="group relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors z-10" />
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
                                <h3 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">{cat.name}</h3>
                                <span className="text-slate-300 text-xs font-medium">{cat.count} Items</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
