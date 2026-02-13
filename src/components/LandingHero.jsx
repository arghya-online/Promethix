import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Box, Sparkles, Cpu, Crosshair, Zap } from "lucide-react";
import HeroBg from "../assets/HeroImages/hero-bg-engineering-minimal.png"; // Premium Minimal Engineering background

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[95vh] flex items-center justify-center">

      {/* 1. Cinematic Anime Engineering Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroBg}
          alt="Futuristic 3D Printing Engineering Workshop Anime Style"
          className="w-full h-full object-cover scale-105" // Slight scale for parallax feel if we added it, but just static for now
        />
        {/* Darker Cinematic Overlay for "Darker Filter" */}
        <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-900/30"></div>
        {/* Fine Grain for Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* 2. Floating 3D Printing Manufacturing Elements */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden select-none">
        {/* Build Plate Grid - 3D Perspective */}
        <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_scale(2)] origin-bottom"></div>

        {/* Floating Badge: Extruder Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }}
          className="absolute top-32 left-8 md:left-16 hidden md:flex flex-col gap-2"
        >
          <div className="flex items-center gap-3 px-3 py-2 rounded-sm bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Nozzle Temp</span>
              <span className="text-sm font-mono text-amber-500">210°C</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Bed Temp</span>
              <span className="text-sm font-mono text-cyan-500">60°C</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Badge: Print Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-40 right-8 md:right-16 hidden md:flex flex-col items-end gap-1"
        >
          <div className="flex flex-col items-end gap-1 px-4 py-2 rounded-sm bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold">Print Progress</span>
              <span className="text-xs font-mono text-sky-400">98%</span>
            </div>
            <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="w-[98%] h-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            </div>
            <div className="text-[9px] text-slate-500 font-mono mt-1">LAYER: 2405 / 2450</div>
          </div>
        </motion.div>

        {/* Filament Path Animation */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-20" style={{ mixBlendMode: 'screen' }}>
          <motion.path
            d="M 100 100 C 200 200 400 0 500 100 S 800 100 900 300"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="hidden lg:block"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center pt-16">

        {/* Main Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-amber-100/90 text-[11px] uppercase tracking-[0.2em] font-medium mb-8 backdrop-blur-md shadow-lg">
            <span className="w-1 h-1 bg-amber-400 rounded-full box-shadow-amber shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
            Promethix3D
            <span className="w-1 h-1 bg-amber-400 rounded-full box-shadow-amber shadow-[0_0_10px_rgba(251,191,36,0.8)]"></span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium text-slate-100 tracking-tight leading-[0.95] mb-8 drop-shadow-lg">
            Premium 3D <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 filter drop-shadow-[0_2px_20px_rgba(245,158,11,0.2)] font-semibold">
              Printed Gifts
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-2xl mx-auto"
        >
          <p>
            Unique, high-quality 3D prints for your home and desk.
            <br className="hidden md:block" />
            Shop our collection or request a custom design.
          </p>
        </motion.div>

        {/* CTA Buttons - Toned Down Colors */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 mb-20"
        >
          <Link to="/products">
            <Button className="h-14 px-8 bg-slate-100 text-slate-900 hover:bg-white rounded-full text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-1">
              Explore Collection
            </Button>
          </Link>
          <Link to="/custom">
            <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5 bg-transparent backdrop-blur-sm rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:border-white/40">
              Custom Order
            </Button>
          </Link>
        </motion.div>

        {/* Trust Points - Simple & Clean */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 w-full max-w-4xl mx-auto border-t border-white/10 pt-8"
        >
          {[
            { icon: <Box className="w-4 h-4" />, text: "Secure Packaging" },
            { icon: <CheckCircle2 className="w-4 h-4" />, text: "0.1mm Precision" },
            { icon: <Sparkles className="w-4 h-4" />, text: "Premium Resin" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-400 font-medium text-xs uppercase tracking-[0.1em]">
              <div className="text-white">{item.icon}</div>
              {item.text}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
