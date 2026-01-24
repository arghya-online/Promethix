import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, MessageCircle, Home,
  Ghost, Gift, Hammer, Image as ImageIcon, Box,
  ShieldCheck, PenTool, GraduationCap, Star, Crown, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import printerImg from "../assets/about/printer.png";
import filamentImg from "../assets/about/filament.png";
import finishedImg from "../assets/about/finished.png";

export default function About() {

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919832769269";
    const message = "Hi Promethix3D, I have an idea for a custom 3D print. Can you help me with the details?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-white">

        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 z-0 hidden lg:block" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 z-0" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* Left: Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-2">
              <span className="h-px w-8 bg-amber-500"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase">
                Premium 3D Printing
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900">
              We design and <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">3D print</span> custom products that feel truly <span className="italic font-serif text-amber-600">premium.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl font-medium text-slate-800 border-l-4 border-amber-400 pl-4 py-2 bg-amber-50/50">
              Promethix3D is a product-first 3D printing startup built to turn ideas into high-quality physical objects.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
              <p>
                We create everything from home decor and figurines to personalized gifts, lithophanes, and functional mechanical parts for student and maker projects - all designed with precision and printed to last.
              </p>
              <p>
                You don’t need a 3D file to get started. Share your idea, sketch, or reference. We’ll take care of the design, print it cleanly, and deliver it safely to your doorstep.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-2">
              <p className="font-bold text-slate-900 mb-6 text-lg">
                Tell us what you need. We’ll <span className="underline decoration-amber-400 decoration-2 underline-offset-2">design it</span>, <span className="underline decoration-amber-400 decoration-2 underline-offset-2">print it</span>, and <span className="underline decoration-amber-400 decoration-2 underline-offset-2">make it real</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleWhatsAppClick} className="h-14 px-8 bg-slate-900 text-white font-bold rounded-none hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl">
                  Start Your Project
                </Button>
                <Link to="/products">
                  <Button variant="outline" className="h-14 px-8 border-2 border-slate-200 text-slate-700 font-bold rounded-none hover:border-slate-900 hover:text-slate-900 hover:bg-transparent transition-all">
                    Explore Collections
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium Imagery Composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/20 to-transparent rounded-none" />

            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="absolute top-10 right-10 w-80 aspect-[3/4] shadow-2xl z-20"
            >
              <img src={finishedImg} alt="Premium Finished Print" className="w-full h-full object-cover border-8 border-white" />
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-4 shadow-lg">
                <p className="font-black text-2xl">100%</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Premium Quality</p>
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="absolute bottom-20 left-10 w-64 aspect-square shadow-xl z-10 border-8 border-white"
            >
              <img src={filamentImg} alt="Quality Materials" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </motion.div>

            {/* Detail Element */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 bg-white p-4 shadow-lg z-30 border border-slate-100 max-w-[180px]">
              <div className="flex gap-1 text-amber-500 mb-2">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <p className="text-xs font-medium text-slate-600">"Precision and finish are unmatched."</p>
            </div>
          </motion.div>

        </div>
      </section>


      {/* 2. OUR COLLECTIONS (Marquee Style) */}
      <section className="py-16 bg-slate-900 border-y border-slate-800 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />


        <div className="max-w-[1200px] mx-auto px-6 mb-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-amber-500 font-bold tracking-widest uppercase text-xs block mb-2"
          >
            What We Create
          </motion.span>
          <h2 className="text-2xl font-black text-white">From Art to Engineering</h2>
        </div>

        <div className="flex overflow-hidden select-none">
          <motion.div
            className="flex gap-16 items-center whitespace-nowrap min-w-full"
            animate={{ x: "-100%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[
              "Home Decor", "Wall Art", "Planters", "Vases", "Desk Accessories",
              "Anime Figurines", "Action Figures", "Cartoon Models", "Cosplay Props",
              "Personalized Gifts", "Custom Nameplates", "Lithophanes", "Photo Frames",
              "Engineering Parts", "Prototypes", "Gears & Brackets", "Enclosures",
              "Replacement Parts", "Architectural Models", "Miniatures", "Idols",
              "Trophies", "Awards", "Corporate Gifts", "Keychains", "Phone Stands"
            ].concat([
              "Home Decor", "Wall Art", "Planters", "Vases", "Desk Accessories",
              "Anime Figurines", "Action Figures", "Cartoon Models", "Cosplay Props",
              "Personalized Gifts", "Custom Nameplates", "Lithophanes", "Photo Frames",
              "Engineering Parts", "Prototypes", "Gears & Brackets", "Enclosures",
              "Replacement Parts", "Architectural Models", "Miniatures", "Idols",
              "Trophies", "Awards", "Corporate Gifts", "Keychains", "Phone Stands"
            ]).map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-600 group-hover:from-amber-400 group-hover:to-orange-500 transition-colors duration-300 cursor-default">
                  {item}
                </span>
                <span className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* 3. PREMIUM QUALITY & USEFULNESS */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Left: Why Us Content */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6">Why we are different.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We don't just print files; we engineer solutions. Whether it's a beautiful showpiece or a critical mechanical component, our focus is always on <span className="font-bold text-slate-900">utility and quality</span>.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 shrink-0 bg-blue-50 flex items-center justify-center text-blue-600">
                    <Crown className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Quality Models</h3>
                    <p className="text-slate-600">
                      We use industrial-grade calibration to ensure smooth surfaces, accurate dimensions, and prints that feel solid in hand. No stringing, no rough edges.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 shrink-0 bg-green-50 flex items-center justify-center text-green-600">
                    <Box className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Truly Useful & Functional</h3>
                    <p className="text-slate-600">
                      Looking for something specific? We specialize in functional prints. From replacing broken household plastic parts to creating custom organizers, we make things that work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Showcase */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
                  className="bg-slate-100 h-64 w-full flex items-center justify-center flex-col p-6 text-center"
                >
                  <ShieldCheck className="w-12 h-12 text-slate-400 mb-4" />
                  <span className="font-bold text-slate-900">Durability Tested</span>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="bg-amber-50 h-64 w-full flex items-center justify-center flex-col p-6 text-center translate-y-8"
                >
                  <PenTool className="w-12 h-12 text-amber-500 mb-4" />
                  <span className="font-bold text-amber-900">Designer Support</span>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 4. PROCESS - CLEAN & SIMPLE */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-16">How to get your premium print</h2>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative px-4">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-200 -z-10"></div>

            {[
              { i: 1, title: "Share Idea", text: "Text us your sketch or requirement.", icon: MessageCircle },
              { i: 2, title: "We Design", text: "We create/optimize the 3D model.", icon: PenTool },
              { i: 3, title: "We Print", text: "Printed with high-grade materials.", icon: printerImg },
              { i: 4, title: "Delivered", text: "Safe packing & shipping to you.", icon: Box }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 border border-slate-100 shadow-sm flex-1 relative min-h-[200px] flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 ring-8 ring-white">
                  {step.i}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700 text-white font-bold h-14 px-10 rounded-full shadow-xl hover:shadow-green-200/50 transition-all hover:-translate-y-1">
              <MessageCircle className="w-5 h-5 mr-2" /> Start Now on WhatsApp
            </Button>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">No hidden fees • Free consultation</p>
          </div>

        </div>
      </section>

    </div>
  );
}

