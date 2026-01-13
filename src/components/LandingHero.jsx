import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Box, Sparkles } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-100 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-100 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        {/* Status Chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
            Ready to Ship | Custom Orders Open
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-4 mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 tracking-tight leading-none">
            Bring Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Ideas</span><br />
            Dimensions.
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          We sell premium 3D printed artifacts and offer custom engineering services.
          <br className="hidden md:block" />
          From prototypes to art - if you can model it, we can make it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16"
        >
          <Link to="/products" className="w-full sm:w-auto">
            <Button className="w-full h-14 px-10 bg-slate-900 text-white hover:bg-slate-800 rounded-full text-base font-bold tracking-wide shadow-xl shadow-slate-900/10 transition-transform active:scale-95">
              Shop Collection
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/custom" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full h-14 px-10 border-slate-300 text-slate-900 hover:border-slate-900 bg-white hover:bg-slate-50 rounded-full text-base font-bold tracking-wide transition-all">
              Start Custom Order
            </Button>
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 text-center border-t border-slate-100 pt-10"
        >
          <TrustBadge icon={<Box className="w-5 h-5 text-amber-500" />} text="Secure Packaging" />
          <TrustBadge icon={<CheckCircle2 className="w-5 h-5 text-amber-500" />} text="Quality Checked" />
          <TrustBadge icon={<Sparkles className="w-5 h-5 text-amber-500" />} text="Premium Materials" />
        </motion.div>

      </div>
    </section>
  );
}

function TrustBadge({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-slate-500 font-medium text-sm">
      {icon}
      <span>{text}</span>
    </div>
  )
}
