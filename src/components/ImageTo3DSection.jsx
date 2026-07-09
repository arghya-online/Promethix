import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Image as ImageIcon, ArrowRight, MessageCircle, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import originalSketch from "../assets/productImages/original_sketch.png";
import originalPrint from "../assets/productImages/original_print.png";


export function ImageTo3DSection() {
  const whatsappNumber = "919832769269";
  const whatsappMessage = "Hi PROMETHIX3D! I have an image or sketch of a design that I would like to convert into a 3D model and print. Can you help me coordinate this custom order?";

  const handleWhatsAppRedirect = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/50 border-t border-b border-slate-100">
      {/* CAD Blueprint grid background detail */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.008)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />

      {/* Symmetrical soft background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-[90px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-orange-500/5 rounded-full blur-[90px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-amber-700 bg-amber-500/5 border border-amber-500/10 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" /> Advanced 3D Fabrication
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            AI Image to 3D Model
          </h2>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed font-medium">
            Turn your 2D sketches, sketches from Pinterest, or logo drawings into physical 3D printed items. Our modeling team works directly with you on WhatsApp to convert images to precise CAD models.
          </p>
        </div>

        {/* Visual Dual Panel */}
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto mb-14">

          {/* Card 1: 2D Input Sketch representation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col gap-4"
          >
            <div className="absolute top-4 left-4 bg-slate-900 text-white font-mono text-[9px] px-2 py-0.5 rounded tracking-wider z-20">
              2D INPUT SKETCH
            </div>

            <div className="flex flex-col items-center justify-center gap-3 pt-6 pb-2 text-slate-350 flex-grow">
              <div className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-100 transition-all duration-300">
                <img src={originalSketch} alt="Original Sketch" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-700">Any Drawing, Photo or Reference</p>
                <p className="text-[10px] text-slate-400 mt-1 font-semibold">Pinterest shots, Instagram posts, or hand sketches</p>
              </div>
            </div>

            {/* Simulated blueprint draft lines overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-slate-200" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-slate-200" />
            </div>
          </motion.div>

          {/* Card 2: 3D Output Voxel representation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-950 p-6 rounded-2xl shadow-xl relative flex flex-col gap-4 overflow-hidden border border-zinc-900"
          >
            <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-mono text-[9px] px-2 py-0.5 rounded tracking-wider font-extrabold z-20">
              3D FABRICATED MESH
            </div>

            {/* Dynamic Symmetrical Voxel/Grid animation */}
            <div className="flex flex-col items-center justify-center gap-3 pt-6 pb-2 text-amber-500/80 flex-grow">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-300">
                <img src={originalPrint} alt="Original Printed 3D Model" className="w-full h-full object-cover" />
                <Cpu className="w-3.5 h-3.5 absolute top-2 right-2 text-amber-400 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-zinc-150">Volumetric Print-Ready CAD Asset</p>
                <p className="text-[10px] text-zinc-500 mt-1 font-semibold">Fully optimized layer slice coordinate output</p>
              </div>
            </div>

            {/* Glowing background circle */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          </motion.div>

        </div>

        {/* Call to Action Container */}
        <div className="text-center">
          <Button
            onClick={handleWhatsAppRedirect}
            className="h-14 px-10 bg-zinc-950 hover:bg-zinc-800 text-white font-black uppercase tracking-widest text-[10px] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 cursor-pointer flex items-center justify-center gap-3.5 mx-auto"
          >
            <span>Send Sketch to WhatsApp</span>
            <MessageCircle className="w-5 h-5 text-[#25d366] fill-[#25d366]/10" />
          </Button>

          <p className="mt-3.5 text-[9px] text-slate-400 uppercase tracking-widest font-black">
            * Our engineering team will outline and prototype your model step-by-step
          </p>
        </div>

      </div>
    </section>
  );
}
