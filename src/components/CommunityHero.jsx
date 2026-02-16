import React from "react";
import { motion } from "framer-motion";
import HeroBg from "../assets/HeroImages/bambu_lab_setup_hero.png";
import { Sparkles } from "lucide-react";

export const CommunityHero = () => {
  return (
    <section className="relative w-full h-[35vh] md:h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-950 text-white shadow-2xl">

      {/* 1. Animated Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src={HeroBg}
          alt="Premium 3D Printing Studio"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
        />

        {/* Vignette & Gradient Overlay for Focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/90 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80 pointer-events-none"></div>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        {/* Glass Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-slate-300">
            Converting Your Thoughts into Reality
          </span>
        </motion.div>

        {/* Main Heading with Staggered Reveal */}
        {/* Main Heading with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtle Glow behind text */}
          <div className="absolute -inset-10 bg-amber-500/20 blur-[50px] rounded-full opacity-20 pointer-events-none"></div>

          <h1 className="relative text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase drop-shadow-2xl leading-[0.9]">
            PROMETHIX<span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600">3D</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <p className="text-white text-xl md:text-2xl font-bold tracking-wide">
            Crafted with precision. <span className="text-amber-500">Designed to stand out.</span>
          </p>
          <p className="text-slate-300 text-sm md:text-base font-medium tracking-wide max-w-2xl px-4">
            Premium 3D printed products made for creators, builders, and bold ideas.
          </p>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100px", opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-8"
        />

      </div>
    </section>
  );
};
