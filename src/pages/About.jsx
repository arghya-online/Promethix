import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, MessageCircle, PenTool, Printer, Package,
  Zap, Heart, ShieldCheck, Cpu, BookOpen, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutBg from "../assets/about/about-anime-bg.png"; // Unique About Bg

export default function About() {

  const handleWhatsAppClick = () => {
    const phoneNumber = "919832769269"; 
    const message = "Hi Promethix3D, I have an idea for a custom 3D print and would like to coordinate a consultation.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">

      {/* FIXED BACKGROUND IMAGE covering the entire page */}
      <div className="fixed inset-0 z-0">
        <img
          src={AboutBg}
          alt="Engineering Studio Workshop Background"
          className="w-full h-full object-cover grayscale-[20%] contrast-125"
        />
        <div className="absolute inset-0 bg-slate-950/88 backdrop-blur-[3px]"></div>
      </div>

      {/* CONTENT SCROLLABLE */}
      <div className="relative z-10">

        {/* 1. Header Section */}
        <section className="pt-32 pb-16 md:pt-44 md:pb-20 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-500 bg-amber-500/10 border border-amber-500/15 px-3.5 py-1.5 rounded-full inline-block">
              PRECISION ENGINEERING • BORN IN THE LAB
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase drop-shadow-xl">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">PROMETHIX3D</span>
            </h1>
            <p className="text-base md:text-lg text-slate-350 leading-relaxed font-semibold max-w-3xl mx-auto drop-shadow-md">
              Promethix3D is a technology startup and research-driven digital fabrication initiative born out of the <span className="text-white font-bold">Department of Mechanical Engineering</span> at the <span className="text-white font-bold">Institute of Engineering & Management (IEM)</span>, operating under the institutional patronage of the <span className="text-amber-400 font-bold">IEM Research Foundation</span>.
            </p>
          </motion.div>
        </section>

        {/* 2. Core Roots Info Box */}
        <section className="py-12 border-y border-white/5 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Academic Pillars */}
              <div className="md:col-span-7 space-y-5 text-left">
                <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-wide">
                  Academic Roots & Research Integrity
                </h2>
                <div className="h-1 w-16 bg-amber-500" />
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  What started as an academic investigation into high-fidelity polymer extrusion and custom computer-aided design (CAD) coordinates has evolved into a production-grade digital fabrication startup. 
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  By blending rigorous mechanical engineering principles with cutting-edge 3D printing filaments, we achieve high-precision tolerances up to <span className="text-white font-bold">0.1mm accuracy</span>. We support academic research, rapid prototyping, and high-quality artistic model manufacturing.
                </p>
              </div>

              {/* Right Column: Key Details */}
              <div className="md:col-span-5 grid grid-cols-1 gap-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <GraduationCap className="w-8 h-8 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">Mechanical Engineering Dept.</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal font-semibold">IEM Department overseeing design specifications, filament stress analyses, and structural infill calculations.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <BookOpen className="w-8 h-8 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">IEM Research Foundation</h4>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal font-semibold">Providing institutional framework, research backing, and technical infrastructure for advanced hardware fabrication.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Core Values - Glass Cards */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-12">Engineered Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { icon: <Cpu className="w-6 h-6" />, title: "Precision Tolerances", desc: "Our models are computed with extreme slicing limits, rendering complex curvatures and micro-features down to 0.1mm accuracy." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Material Rigor", desc: "We utilize industrial-grade polymers (PLA+, PETG, Carbon-Fiber PLA, and High-Resolution Resins) analyzed for thermal stability and load capacity." },
                { icon: <Printer className="w-6 h-6" />, title: "Custom Slicing", desc: "Every model undergoes customized infill optimization (hexagonal structural matrixes) to balance weight, filament density, and strength." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-start space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 border border-white/5 shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-xs font-semibold">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. The Process - Simplified Timeline */}
        <section className="py-20 border-t border-white/5 bg-slate-900/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl font-black text-white uppercase tracking-wide mb-4">Laboratory Workflow</h2>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">From Concept Coordinates to Physical Object</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-white/5 -z-10 transform translate-y-0"></div>

              {[
                { step: "01", title: "Idea & Image", icon: MessageCircle, desc: "Submit your drawings, Pinterest posts, or vector sketches." },
                { step: "02", title: "CAD Modeling", icon: PenTool, desc: "Our lab creates custom digital mesh wireframes." },
                { step: "03", title: "Layer Slicing", icon: Printer, desc: "Models are sliced into high-density extrusion coordinates." },
                { step: "04", title: "Fabrication", icon: Package, desc: "Physical objects are printed, inspected, and shipped." }
              ].map((process, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-slate-950 border border-white/10 rounded-full flex items-center justify-center text-slate-350 shadow-xl mb-6 relative z-10">
                    <process.icon className="w-8 h-8" strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-slate-950">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-wide mb-2">{process.title}</h3>
                  <p className="text-xs text-slate-400 font-semibold">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Minimal CTA */}
        <section className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6 space-y-8 bg-slate-950/60 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              Initiate Custom Prototype
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Get in touch with our engineering team directly via WhatsApp to discuss design tolerances, scaling parameters, and quotes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={handleWhatsAppClick} className="h-13 px-10 bg-amber-500 text-white hover:bg-amber-600 rounded-full text-xs font-black uppercase tracking-widest border-0 cursor-pointer shadow-lg hover:-translate-y-0.5 transition-all">
                Start WhatsApp Consultation
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
