import React, { useState, useEffect } from "react";
import { SHOWCASE_PRODUCTS } from "../data/showcaseProducts";
import { ShowcaseProductCard } from "../components/ShowcaseProductCard";
import {
  Instagram,
  MessageCircle,
  FileText,
  Sparkles,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import stall1 from "../assets/showcaseImages/stall1Atinnovacion2026.png";
import stall2 from "../assets/showcaseImages/stall2Atinnovacion2026.png.png";

export default function Showcase() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#332D29] pb-24 font-sans relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[100] no-print"
        style={{ scaleX }}
      />

      {/* Global CAD Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.05)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(245,158,11,0.05)_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none no-print opacity-80 animated-grid" />

      {/* Ambient Warm Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)] pointer-events-none z-0 no-print" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none z-0 no-print" />

      <style>{`
        @keyframes moveGridUp {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 -32px;
          }
        }

        .animated-grid {
          animation: moveGridUp 16s linear infinite;
        }

        @media print {
          header,
          footer,
          .announcement-bar,
          .no-print,
          button,
          a[href^="tel:"],
          a[href^="mailto:"] {
            display: none !important;
          }

          @page {
            size: A4 portrait;
            margin: 15mm;
          }

          body {
            background: #ffffff !important;
            color: #0d1527 !important;
            font-size: 12pt;
          }

          .print-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 12px !important;
          }

          .print-card-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          .print-text-amber {
            color: #d97706 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-8 md:pt-12 pb-8 text-center relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-[70px] pointer-events-none no-print" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.65em] text-amber-700 mb-4 print-text-amber"
          >
            PROMETHIX 3D
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#231F1C] leading-[1.1] mb-6"
          >
            Crafted Layer by Layer.
          </motion.h1>

          <motion.div variants={fadeInUp} className="no-print">
            <button
              onClick={handlePrint}
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 border border-amber-900/30 bg-white/70 text-amber-800 hover:text-[#231F1C] hover:border-amber-500/60 hover:bg-white transition-all duration-300 uppercase tracking-[0.2em] text-[10px] font-mono font-bold shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-700 group-hover:rotate-6 transition-all duration-300" />
              <span>Export Pamphlet</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* UNIFIED GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 print-grid">
          {SHOWCASE_PRODUCTS.map((product) => (
            <div key={product.id} className="print-card-break">
              <ShowcaseProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* EXHIBITION STALL SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-24 relative z-10 print-card-break">
        <div className="border-b border-amber-900/15 pb-3 mb-8">
          <h2 className="text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#231F1C]">
            Our Exhibition Stall – Innovacion 2026
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Stall Image 1 Card */}
          <div className="group relative bg-white/80 border border-amber-900/15 hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] transition-all duration-500 flex flex-col overflow-hidden">
            {/* Tech CAD Corner Brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />

            <span className="absolute top-3.5 left-3.5 z-10 bg-amber-50/95 backdrop-blur-md px-2 py-0.5 border border-amber-200 text-[8px] font-mono tracking-widest text-amber-800 uppercase select-none pointer-events-none">
              EX-01
            </span>

            <div className="relative aspect-[4/3] bg-amber-50/30 overflow-hidden border-b border-amber-900/10 print:bg-white print:border-slate-200 cursor-pointer">
              <img
                src={stall1}
                alt="Promethix3d Stall Setup - Front View"
                className="object-cover w-full h-full transform group-hover:scale-102 transition-transform duration-700 ease-out print:transform-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(245,158,11,0.06))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none print:hidden" />
            </div>

            <div className="p-4 md:p-5 bg-white/40 print:p-3 print:bg-white flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amber-600 mb-1.5 font-mono select-none block">
                  EXHIBITION VIEW
                </span>
                <h3 className="font-heading text-base md:text-lg font-bold text-[#231F1C] leading-tight group-hover:text-amber-700 transition-colors duration-300 print:text-black">
                  Innovacion 2026 Exhibition Booth
                </h3>
                <p className="text-xs text-[#8C7E77] mt-1.5">
                  Showcasing our 3D printed models, custom drone designs, and interactive display setup.
                </p>
              </div>
            </div>
          </div>

          {/* Stall Image 2 Card */}
          <div className="group relative bg-white/80 border border-amber-900/15 hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] transition-all duration-500 flex flex-col overflow-hidden">
            {/* Tech CAD Corner Brackets */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-amber-900/10 group-hover:border-amber-500/70 transition-colors duration-500 pointer-events-none" />

            <span className="absolute top-3.5 left-3.5 z-10 bg-amber-50/95 backdrop-blur-md px-2 py-0.5 border border-amber-200 text-[8px] font-mono tracking-widest text-amber-800 uppercase select-none pointer-events-none">
              EX-02
            </span>

            <div className="relative aspect-[4/3] bg-amber-50/30 overflow-hidden border-b border-amber-900/10 print:bg-white print:border-slate-200 cursor-pointer">
              <img
                src={stall2}
                alt="Promethix3d Team & Stall Display"
                className="object-cover w-full h-full transform group-hover:scale-102 transition-transform duration-700 ease-out print:transform-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(245,158,11,0.06))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none print:hidden" />
            </div>

            <div className="p-4 md:p-5 bg-white/40 print:p-3 print:bg-white flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amber-600 mb-1.5 font-mono select-none block">
                  EXHIBITION VIEW
                </span>
                <h3 className="font-heading text-base md:text-lg font-bold text-[#231F1C] leading-tight group-hover:text-amber-700 transition-colors duration-300 print:text-black">
                  Innovacion 2026 Product Gallery
                </h3>
                <p className="text-xs text-[#8C7E77] mt-1.5">
                  A closer look at the local creations, devotional models, and engineering prototypes on display.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="max-w-3xl mx-auto px-6 pt-16 border-t border-amber-900/15 text-center print-card-break relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10 text-left">
          <a
            href="https://instagram.com/promethix3d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-amber-900/15 bg-white/60 hover:border-amber-500/40 hover:bg-white transition-all duration-300 shadow-sm"
          >
            <div className="w-10 h-10 bg-amber-50/80 flex items-center justify-center text-amber-700">
              <Instagram className="w-5 h-5" />
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C7E77]">
                Instagram
              </span>

              <span className="text-xs font-bold text-[#231F1C]">
                @promethix3d
              </span>
            </div>
          </a>

          <a
            href="https://wa.me/919832769269"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-amber-900/15 bg-white/60 hover:border-amber-500/40 hover:bg-white transition-all duration-300 shadow-sm"
          >
            <div className="w-10 h-10 bg-green-50 flex items-center justify-center text-green-600">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C7E77]">
                WhatsApp
              </span>

              <span className="text-xs font-bold text-[#231F1C]">
                +91 98327 69269
              </span>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 border border-amber-900/15 bg-white/60 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 flex items-center justify-center text-amber-600">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C7E77]">
                Services
              </span>

              <span className="text-xs font-bold text-[#231F1C]">
                Custom Orders Available
              </span>
            </div>
          </div>
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-[0.2em] text-amber-800/60">
          Thank you for exploring our catalog of work.
        </p>
      </section>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full border border-amber-900/15 bg-white/80 text-amber-700 hover:text-[#231F1C] hover:bg-white hover:border-amber-500/50 shadow-md backdrop-blur-sm transition-colors duration-300 no-print flex items-center justify-center cursor-pointer"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}