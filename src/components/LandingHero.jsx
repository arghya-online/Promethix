import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { Hexagon, Check, ArrowDown, ArrowRight } from "lucide-react";
import heroImage from "../assets/heroImage.png";

// Placeholder images for floating objects (using product images)
import { PRODUCTS } from "../data/products";

export function LandingHero() {
  const lineRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  // GSAP Animation for Accent Line
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          transformOrigin: "left",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Enhancement */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-50 via-white to-white opacity-100 -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SECTION */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Brand Mark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <Hexagon className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                PROMETHIX 3D
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="space-y-2 mb-8"
            >
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif font-semibold text-slate-900 leading-[0.9]">
                PRECISION
              </h1>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif font-semibold text-orange-500 leading-[0.9]">
                IN EVERY LAYER
              </h1>
            </motion.div>

            {/* Accent Line */}
            <div ref={lineRef} className="w-24 h-1 bg-orange-500 mb-8" />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-600 text-base md:text-lg leading-relaxed max-w-lg mb-8 font-light"
            >
              Industrial-grade 3D printing for prototypes, art, and custom
              engineering. Designed for impact. Built to last.
            </motion.p>

            {/* Micro Specs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start mb-10"
            >
              {[
                "Quality Artifacts",
                "Industrial materials",
                "Zero compromise",
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-500 font-medium"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  {spec}
                </div>
              ))}
            </motion.div>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/products" className="w-full sm:w-auto">
                <Button className="w-full h-14 px-8 bg-slate-900 text-white hover:bg-slate-800 rounded-md text-base font-bold tracking-wide shadow-xl shadow-slate-900/10">
                  Shop Now
                </Button>
              </Link>
              <Link to="/custom" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full h-14 px-8 border-slate-300 text-slate-900 hover:border-slate-400 hover:bg-slate-50 rounded-md text-base font-bold tracking-wide"
                >
                  Start Custom Build
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
            >
              <span>See how it’s made</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </motion.div>

            {/* Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 text-xs uppercase tracking-wider text-slate-400 font-medium"
            >
              Trusted by makers, engineers, and startups
            </motion.p>
          </div>

          {/* RIGHT SECTION - Visual */}
          <div className="order-1 lg:order-2 relative flex justify-center perspective-1000">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-md mx-auto"
            >
              <img
                src={heroImage}
                alt="Industrial 3D Printer"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />

              {/* Soft Shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-2xl rounded-full" />
            </motion.div>

            {/* Floating Objects (Parallax) */}
            <motion.div
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-24 h-24 hidden lg:block z-20 pointer-events-none"
            >
              <img
                src="print-object-1.png"
                className="w-full h-full object-contain drop-shadow-lg opacity-80"
                alt="Floating Object 1"
              />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              className="absolute bottom-10 left-0 w-32 h-32 hidden lg:block z-20 pointer-events-none"
            >
              <img
                src="print-object-2.png"
                className="w-full h-full object-contain drop-shadow-lg opacity-80"
                alt="Floating Object 2"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
