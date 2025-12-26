import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/products";

export function InfiniteCarousel() {
    const [width, setWidth] = useState(0);
    const carousel = React.useRef(null);

    useEffect(() => {
        // console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    // Duplicate products to create seamless loop effect
    const displayProducts = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

    return (
        <div className="w-full overflow-hidden bg-background py-12 relative">
            {/* Gradient Overlays for smooth fade out at edges */}
            <div className="absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={carousel}
                className="flex gap-6 select-none cursor-grab active:cursor-grabbing hover:pause"
                animate={{ x: [0, -2000] }} // Adjust depending on width
                transition={{
                    repeat: Infinity,
                    duration: 40,
                    ease: "linear",
                    repeatType: "loop"
                }}
            >
                {displayProducts.map((product, index) => (
                    <motion.div
                        key={`${product.id}-${index}`}
                        className="min-w-[200px] md:min-w-[280px] aspect-[3/4] rounded-xl overflow-hidden relative group border border-surface-light bg-surface"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white font-heading font-semibold tracking-wide truncate">{product.name}</p>
                            <p className="text-primary-300 text-sm">₹{product.price}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
