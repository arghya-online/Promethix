import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Banner1 from "../assets/HeroImages/hero_vases.png";
import Banner2 from "../assets/HeroImages/hero_custom.png";
import Banner3 from "../assets/HeroImages/hero_figurines.png";

export function LandingHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: Banner1,
      title: "Precision 3D Vases Collection",
      subtitle: "PREMIUM WORKSPACE DECOR"
    },
    {
      id: 2,
      image: Banner2,
      title: "On-Demand Custom Printing",
      subtitle: "YOUR CAD IDEAS, MADE REAL"
    },
    {
      id: 3,
      image: Banner3,
      title: "Elite Tabletop Figurines",
      subtitle: "HAND-FINISHED ANIME & GEEK ART"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[280px] md:h-[400px] overflow-hidden bg-slate-950">
      
      {/* Sliding Banner Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Lighter multiplier overlay to make text and CTA buttons highly legible */}
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlaid Content (Always Centered and Clear) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl text-white"
          >
            <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 text-amber-400">
              {slides[currentSlide].subtitle}
            </span>
            <h2 className="text-xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-6">
              {slides[currentSlide].title}
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* Global CTA Overlay Buttons (Always present for ease of understanding) */}
        <div className="flex items-center gap-3.5 mt-2">
          <Link to="/products">
            <Button className="h-10 px-6.5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-[10px] uppercase tracking-widest rounded-full border-0 shadow-md cursor-pointer transition-colors duration-200">
              View All Products
            </Button>
          </Link>
          <Link to="/custom">
            <Button className="h-10 px-6.5 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-full border-0 shadow-md cursor-pointer transition-colors duration-200">
              Custom Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Slide Navigation Chevrons */}
      <button
        onClick={prevSlide}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 hover:bg-black/45 text-white transition-colors border-0 cursor-pointer z-20"
      >
        <ChevronLeft className="w-4.5 h-4.5" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/20 hover:bg-black/45 text-white transition-colors border-0 cursor-pointer z-20"
      >
        <ChevronRight className="w-4.5 h-4.5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-0.5 rounded-full transition-all border-0 cursor-pointer ${
              currentSlide === idx ? "bg-white w-4" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}

export default LandingHero;
