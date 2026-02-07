import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, MessageCircle, PenTool, Printer, Package,
  Zap, Heart, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutBg from "../assets/about/about-anime-bg.png"; // Unique About Bg

export default function About() {

  const handleWhatsAppClick = () => {
    const phoneNumber = "919832769269"; // Replace with actual number
    const message = "Hi Promethix3D, I have an idea for a custom 3D print.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">

      {/* FIXED BACKGROUND IMAGE covering the entire page */}
      <div className="fixed inset-0 z-0">
        <img
          src={AboutBg}
          alt="Anime Engineering Studio Workshop"
          className="w-full h-full object-cover grayscale-[20%] contrast-125"
        />
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px]"></div>
      </div>

      {/* CONTENT SCROLLABLE */}
      <div className="relative z-10">

        {/* 1. Header Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-24 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-amber-400 uppercase">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
              Crafting the future, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                one layer at a time.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light drop-shadow-md">
              Promethix3D bridges the gap between digital imagination and physical reality.
              We are a team of precision engineers and designers dedicated to making
              3D printing accessible, premium, and reliable.
            </p>
          </motion.div>
        </section>

        {/* 2. Core Values - Glass Cards */}
        <section className="py-20 border-y border-white/5 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="w-6 h-6" />, title: "Precision Engineering", desc: "Industrial-grade calibration for flawless prints with 0.1mm accuracy." },
                { icon: <Heart className="w-6 h-6" />, title: "Passion for Design", desc: "We don't just print; we refine designs to ensure they look and work perfectly." },
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Quality Guaranteed", desc: "Every print is hand-inspected. If it's not perfect, we reprint it." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-start space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-amber-400 border border-white/5 shadow-lg">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The Process - Simplified Timeline */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white mb-4">How it works</h2>
              <p className="text-slate-400">From concept to doorstep in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-700 -z-10 transform translate-y-0"></div>

              {[
                { step: "01", title: "Idea", icon: MessageCircle, desc: "Message us your sketch or concept." },
                { step: "02", title: "Design", icon: PenTool, desc: "We create the 3D model for you." },
                { step: "03", title: "Print", icon: Printer, desc: "High-fidelity printing begins." },
                { step: "04", title: "Deliver", icon: Package, desc: "Shipped safely to your door." }
              ].map((process, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 shadow-xl mb-6 relative z-10">
                    <process.icon className="w-8 h-8" strokeWidth={1.5} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-slate-900">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{process.title}</h3>
                  <p className="text-sm text-slate-400">{process.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Minimal CTA */}
        <section className="py-24 text-center">
          <div className="max-w-2xl mx-auto px-6 space-y-8 bg-slate-900/60 backdrop-blur-md p-10 rounded-3xl border border-white/10">
            <h2 className="text-4xl font-black text-white tracking-tight">
              Ready to build something?
            </h2>
            <p className="text-lg text-slate-300">
              No 3D files required. Just bring your imagination.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={handleWhatsAppClick} className="h-14 px-10 bg-amber-500 text-white hover:bg-amber-600 rounded-full text-base font-bold shadow-lg shadow-amber-900/20 hover:-translate-y-1 transition-all">
                Start a Project
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
