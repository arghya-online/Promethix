import React from "react";
import { ProductCard } from "./ProductCard";

export function MobileFeaturedCarousel({ products }) {
    return (
        <div className="w-full overflow-hidden py-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 pb-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="min-w-[160px] w-[160px] snap-center">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
