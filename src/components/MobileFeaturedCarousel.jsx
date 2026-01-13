import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ProductCard } from "./ProductCard";

export function MobileFeaturedCarousel({ products }) {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate total width of one set of items
        // We assume items are flexible but the container is what scrolls.
        // For a smooth infinite scroll with GSAP, we animate xPercent or x.

        // Using a context to clean up easily
        let ctx = gsap.context(() => {
            const totalWidth = track.scrollWidth / 2; // Since we doubled the items

            gsap.to(track, {
                x: -totalWidth,
                ease: "none",
                duration: 20, // Slow continuous scroll
                repeat: -1,
            });
        }, trackRef);

        return () => ctx.revert();
    }, [products]);

    // Duplicate items for infinite loop illusion
    const displayProducts = [...products, ...products];

    return (
        <div className="w-full overflow-hidden py-4">
            <div ref={trackRef} className="flex gap-4 w-max">
                {displayProducts.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="w-[80vw] sm:w-[300px]">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
