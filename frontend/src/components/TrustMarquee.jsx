import React from "react";
import { motion } from "framer-motion";

const MARQUEE_TEXT = "LIVE PRINTS IN PROGRESS... 42 ORDERS SHIPPED TODAY... 4.9/5 USER RATING... CUSTOM PROTOTYPING AVAILABLE... WORLDWIDE SHIPPING... ";

export const TrustMarquee = () => {
    return (
        <div className="w-full bg-slate-950 border-y border-slate-800 overflow-hidden py-3 relative z-20">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span
                            key={i}
                            className="text-amber-500 font-mono text-sm md:text-base font-bold tracking-widest mx-4 uppercase"
                            style={{ textShadow: "0 0 10px rgba(245, 158, 11, 0.5)" }}
                        >
                            {MARQUEE_TEXT}
                            <span className="text-slate-700 mx-2">///</span>
                        </span>
                    ))}
                </motion.div>
            </div>
            {/* Glitch/Scanline overlay effect could go here */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>
    );
};
