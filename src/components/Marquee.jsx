import React from "react";
import { motion } from "framer-motion";

export function Marquee() {
    const marqueeText = [
        "CUSTOM DESIGN",
        "3D PRINTING",
        "MADE TO ORDER",
        "PREMIUM FINISH",
        "PROTOTYPES",
        "FIGURINES",
        "LITHOPHANES",
        "SAFE PACKAGING",
        "FAST DISPATCH",
        "QUALITY CHECKED",
        "CUSTOM DESIGN",
        "3D PRINTING",
        "MADE TO ORDER",
        "PREMIUM FINISH",
        "PROTOTYPES",
        "FIGURINES",
        "LITHOPHANES",
        "SAFE PACKAGING",
        "FAST DISPATCH",
        "QUALITY CHECKED",
    ];

    return (
        <div className="relative w-full overflow-hidden bg-slate-900 py-6 border-y border-slate-800">

            {/* Gradient Overlays for Fade Effect */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

            <div className="flex text-amber-500 font-black text-2xl md:text-4xl tracking-tight uppercase whitespace-nowrap overflow-hidden select-none">
                <motion.div
                    className="flex gap-12 md:gap-24 pr-12 md:pr-24"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {marqueeText.concat(marqueeText).map((text, i) => (
                        <span key={i} className="flex items-center gap-12 md:gap-24">
                            {text}
                            <span className="w-3 h-3 rounded-full bg-slate-700" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
