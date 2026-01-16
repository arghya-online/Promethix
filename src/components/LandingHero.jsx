import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Box, Sparkles } from "lucide-react";
import { ENRICHED_PRODUCTS as PRODUCTS } from "@/data/products";

export function LandingHero() {
  // Select specific images for the collage
  const heroImage = PRODUCTS[0].image; // Vase
  const subImage1 = PRODUCTS[2].image; // Ganesha
  const subImage2 = PRODUCTS[5].image; // Moon Lamp

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 pt-16 pb-20 lg:pt-32 lg:pb-32 min-h-[90vh] flex items-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-amber-200/40 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left max-w-xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
                Bring Ideas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Into Reality.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed font-medium"
            >
              We design and 3D print premium models, decor pieces, gifts, figurines, and project parts.
              <br className="hidden md:block" />
              Pick from our collection or send your custom requirement — we’ll take it from design to delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full border border-slate-200 mb-10 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm text-slate-500 font-semibold">
                No 3D file? No problem. We’ll design it for you.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
            >
              <Link to="/products">
                <Button className="h-14 px-10 bg-slate-900 text-white hover:bg-black rounded-full text-sm font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 transition-all hover:-translate-y-1 w-full sm:w-auto">
                  Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="outline" className="h-14 px-10 border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-white/50 backdrop-blur rounded-full text-sm font-bold tracking-widest uppercase transition-all w-full sm:w-auto">
                  Start Custom Order
                </Button>
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-8 border-t border-slate-200/60 w-full"
            >
              {[
                { icon: <Box className="w-4 h-4" />, text: "Safe Packaging" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Quality Checked" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Premium Materials" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wide">
                  <div className="text-amber-600">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual Collage */}
          <div className="relative h-[500px] lg:h-[700px] hidden lg:block">

            {/* Main Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="absolute top-10 right-10 w-[80%] h-[70%] bg-white p-3 rounded-[2rem] shadow-2xl shadow-slate-300/50 z-20"
            >
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                <img src={heroImage} className="w-full h-full object-cover" alt="Hero 3D Print" />
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -3 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="absolute bottom-20 left-10 w-[45%] h-[40%] bg-white p-3 rounded-[2rem] shadow-xl z-30"
            >
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                <img src={subImage1} className="w-full h-full object-cover" alt="Detail Print" />
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 1, delay: 0.7 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-1/2 right-0 w-[35%] h-[30%] bg-white p-2 rounded-[1.5rem] shadow-lg z-10 filter blur-[1px]"
            >
              <div className="w-full h-full rounded-[1.2rem] overflow-hidden opacity-80">
                <img src={subImage2} className="w-full h-full object-cover" alt="Background Element" />
              </div>
            </motion.div>

            {/* Backdrop Blob */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-orange-100 rounded-full blur-[80px] opacity-40 -z-10 scale-90"
            />

          </div>
        </div>
      </div>
    </section>
  );
}
