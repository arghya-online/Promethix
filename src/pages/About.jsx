import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, MessageCircle, Home,
  Ghost, Gift, Hammer, Image as ImageIcon, Box,
  ShieldCheck, PenTool, GraduationCap
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
        staggerChildren: 0.2
      }
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919832769269";
    const message = "Hi Promethix3D, I have an idea for a custom 3D print. Can you help me with the details?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 max-w-[1200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.span variants={fadeInUp} className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase block">
              About Promethix3D
            </motion.span>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black leading-[1.1] text-slate-900">
              We design and 3D print custom products that actually feel premium.
            </motion.h1>

            <motion.div variants={fadeInUp} className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              <p>
                We’re Promethix3D - a small 3D design + printing studio. We make everything from decor and figurines to gifts, idols, lithophanes, and even mechanical parts for student projects.
              </p>
              <p>
                You can explore ready-made models from our shop, or send a custom request. Even if you don’t have a 3D file - no worries. Just share your idea and we’ll take it from there.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-amber-50 border border-amber-100 p-6 rounded-none max-w-md">
              <p className="font-medium text-amber-900 text-sm leading-relaxed">
                Just tell us what you need. We’ll design it, print it cleanly, and deliver it safely to your location.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <Link to="/products">
                <Button className="h-12 px-8 bg-slate-900 text-white font-bold rounded-none hover:bg-slate-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                  Browse Products
                </Button>
              </Link>
              <Button onClick={handleWhatsAppClick} variant="outline" className="h-12 px-8 border-slate-200 text-slate-700 font-bold rounded-none hover:bg-slate-50 hover:text-slate-900">
                Start Custom Order
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Card 1: Printer */}
            <motion.div
              whileHover={{ y: -10, rotate: -2, scale: 1.02 }}
              className="absolute top-0 right-10 w-64 aspect-[4/5] bg-white p-2 rounded-none shadow-xl z-10 rotate-3 border border-slate-100"
            >
              <img
                src={printerImg}
                alt="3D Printer"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-none text-xs font-bold text-slate-900 shadow-sm">
                3D Printer
              </div>
            </motion.div>

            {/* Card 2: Filament */}
            <motion.div
              whileHover={{ y: -10, rotate: 2, scale: 1.02 }}
              className="absolute top-40 left-10 w-56 aspect-square bg-white p-2 rounded-none shadow-xl z-20 -rotate-6 border border-slate-100"
            >
              <img
                src={filamentImg}
                alt="Filament"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-none text-xs font-bold text-slate-900 shadow-sm">
                Filament Material
              </div>
            </motion.div>

            {/* Card 3: Finished Print */}
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="absolute bottom-10 right-20 w-60 aspect-square bg-white p-2 rounded-none shadow-2xl z-30 rotate-6 border border-slate-100"
            >
              <img
                src={finishedImg}
                alt="Finished Print"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-none text-xs font-bold text-slate-900 shadow-sm">
                Finished Print
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>


      {/* 2. WHAT WE MAKE */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">What we make</h2>
            <p className="text-slate-500 font-medium">Some popular things people order from us.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Home, text: "Home Decor & Artifacts" },
              { icon: Ghost, text: "Anime / Cartoon Figurines" },
              { icon: Gift, text: "Custom Gifts & Nameplates" },
              { icon: Hammer, text: "Idols & Miniature Models" },
              { icon: ImageIcon, text: "Lithophanes (Photo Prints)" },
              { icon: Box, text: "Project Parts & Prototypes" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.05)" }}
                className="bg-white p-6 rounded-none border border-slate-200 flex items-center gap-4 transition-all hover:border-amber-200 group cursor-default"
              >
                <div className="w-12 h-12 rounded-none bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm font-medium mt-12 bg-white inline-block px-6 py-2 rounded-none border border-slate-100 mx-auto block w-max">
            If you can describe it, we can probably design and print it.
          </p>
        </div>
      </section>


      {/* 3. HOW CUSTOM ORDERS WORK */}
      <section className="py-20 md:py-32 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Custom orders are super simple.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Send your idea", desc: "WhatsApp us a photo, sketch, link, dimensions, or STL file." },
            { step: "02", title: "We design it", desc: "Our team prepares the model and shares a preview for approval." },
            { step: "03", title: "We print it", desc: "We print with clean detailing and strength (material depends on use)." },
            { step: "04", title: "Packed & delivered", desc: "We quality check, pack safely, and ship to your location." },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-2 -z-10 select-none">
                {s.step}
              </div>
              <div className="bg-white pt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {s.desc}
                </p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-8 -right-4 text-slate-200">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6 font-medium">Have something in mind? Start your custom order on WhatsApp.</p>
          <Button onClick={handleWhatsAppClick} className="bg-green-600 hover:bg-green-700 text-white font-bold h-12 px-8 rounded-none shadow-lg hover:shadow-green-200 transition-all hover:-translate-y-1">
            <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
          </Button>
        </div>
      </section>


      {/* 4. WHY PROMETHIX3D */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Why people choose Promethix3D</h2>
            <p className="text-slate-400 text-lg">We’re small, but we take quality seriously.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Quality First", text: "Every print is checked properly. If it doesn’t look right, we don’t ship it." },
              { icon: PenTool, title: "Design Support", text: "We don’t just print files. We help improve the design so it looks better and works better." },
              { icon: GraduationCap, title: "Friendly for Students", text: "A lot of our customers are students and makers. We keep the process simple and guide you properly." },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-8 rounded-none hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 rounded-none flex items-center justify-center mb-6 text-amber-400">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. FINAL CTA Footer Strip */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Ready to print your idea?</h2>
            <p className="text-amber-900 font-medium">Send your requirement on WhatsApp and we’ll reply with pricing + timeline.</p>
          </div>
          <Button onClick={handleWhatsAppClick} className="bg-slate-900 hover:bg-black text-white px-8 h-14 rounded-none font-bold text-lg shadow-xl hover:scale-105 transition-all">
            Start on WhatsApp
          </Button>
        </div>
      </section>

    </div>
  );
}
