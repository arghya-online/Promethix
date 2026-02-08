import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "@/components/AuthModal";
import {
  FileUp,
  Ruler,
  MessageCircle,
  CheckCircle,
  Truck,
  ShieldCheck,
  Zap,
  HelpCircle,
  PenTool,
  Box
} from "lucide-react";
import CustomOrderBg from "../assets/HeroImages/custom-order-bg.png"; // Realistic Bg

gsap.registerPlugin(ScrollTrigger);

export default function CustomProduct() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const { user: currentUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const whatsappNumber = "+919832769269"; // Replace with actual number
  const message = encodeURIComponent(
    "Hi PROMETHIX3D, I have a custom 3D printing request."
  );

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // HERO animation
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        });
      }

      // Process steps
      if (timelineRef.current) {
        const steps = timelineRef.current.querySelectorAll(".process-step");

        gsap.from(steps, {
          x: -14,
          opacity: 0,
          duration: 0.55,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
          },
        });

        // Timeline line
        gsap.fromTo(
          timelineRef.current.querySelector(".timeline-line"),
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 85%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    { num: "01", title: "Share idea", desc: "Send photo, STL, sketch, or just text." },
    { num: "02", title: "We check + quote", desc: "We verify feasibility and share pricing." },
    { num: "03", title: "Design support", desc: "We create/optimize the model as needed." },
    { num: "04", title: "Preview approval", desc: "You approve the design before printing." },
    { num: "05", title: "Print", desc: "We print with clean finish and strength." },
    { num: "06", title: "Pack + deliver", desc: "Safe packing + tracked delivery." },
  ];

  const faqs = [
    {
      title: "How is pricing calculated?",
      content:
        "Pricing depends on print time, material used, and design complexity. We always share a fixed quote before starting.",
    },
    {
      title: "Do I need a 3D file (STL)?",
      content:
        "No. If you have one, great. If not, send photos/sketches/dimensions - we’ll create the 3D model for you.",
    },
    {
      title: "What materials do you use?",
      content:
        "Mostly PLA and PETG. For high detail miniatures we can use resin depending on the model.",
    },
    {
      title: "How long does it take?",
      content:
        "Small orders usually ship in 2–3 days. Custom modelling work may take 5–7 days depending on complexity.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
    >
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 fixed">
        <img
          src={CustomOrderBg}
          alt="Cozy realistic workspace with 3D prints"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-[4px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white">

        {/* HERO */}
        <div
          ref={heroRef}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-white/10 bg-slate-900/50 backdrop-blur-md rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-100">
              Custom 3D Printing Service
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[0.95] drop-shadow-xl">
            If you can imagine it, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">we can print it.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            From prototypes to personalized gifts. No minimum quantity.
            Design support included.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-200 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> High Precision
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <Truck className="w-4 h-4 text-sky-400" /> Pan-India Delivery
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Quality Checked
            </div>
          </div>

          {/* HERO CTA ROW */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              {currentUser ? (
                <Button
                  onClick={openWhatsApp}
                  className="h-14 px-8 w-full md:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-[1.03] transition-all duration-300 border-0"
                >
                  Start on WhatsApp <MessageCircle className="ml-3 w-5 h-5" />
                </Button>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} className="h-14 px-8 w-full md:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-sm rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-[1.03] transition-all duration-300 border-0">
                  Sign In to Start
                </Button>
              )}

              <Link to="/products" className="w-full md:w-auto">
                <Button variant="outline" className="h-14 px-8 w-full md:w-auto bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-bold uppercase tracking-widest text-sm rounded-full backdrop-blur-sm">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* PROCESS */}
        <div ref={timelineRef} className="mb-20 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-3 text-white">How It Works</h2>
            <p className="text-slate-400">Simple steps. Clear workflow.</p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-800" />
            <div className="timeline-line absolute left-[19px] top-4 w-[2px] bg-amber-500 h-0 box-shadow-amber shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

            <div className="space-y-12">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="process-step relative pl-16 flex flex-col md:flex-row md:items-center gap-2 md:gap-8"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center z-10 rounded-full shadow-lg">
                    <span className="text-xs font-black text-amber-400">{step.num}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 font-light">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILE GUIDE */}
        <div className="mb-20 grid md:grid-cols-2 gap-8 items-start">
          {/* Column 1: HOW TO SEND */}
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-2xl font-black mb-8 relative z-10 flex items-center gap-3 text-white">
              <FileUp className="w-6 h-6 text-emerald-400" /> Send Files
            </h3>

            <ul className="space-y-5 relative z-10">
              {[
                "STL / OBJ / STEP files",
                "Reference Images (JPG/PNG)",
                "Canva / PDF Designs",
                "Simply explain in text"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300 font-medium text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-10 border border-white/5 bg-white/5 backdrop-blur-sm rounded-2xl">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-white">
              <MessageCircle className="w-6 h-6 text-amber-400" /> What to Mention
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                <Ruler className="size-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-200">
                  Approx. Size (e.g. 10cm tall)
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                <PenTool className="size-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-200">
                  Color Preference (e.g. Matte Black)
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-900/60 border border-white/5 rounded-xl">
                <Box className="size-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-200">
                  Application (e.g. Outdoor use)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ - Customized for Dark Mode */}
        <div className="mb-24 max-w-3xl mx-auto custom-accordion-dark">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3 text-white">FAQs</h2>
            <p className="text-slate-400">Quick answers to common questions.</p>
          </div>
          {/* Note: Accordion might need CSS override for dark mode if it doesn't support it natively via classes. 
              Assuming it uses standard Tailwind classes or context. */}
          <div className="space-y-4">
            <Accordion items={faqs} className="text-slate-200" />
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
        {currentUser ? (
          <Button
            onClick={openWhatsApp}
            className="w-full h-12 bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest rounded-full shadow-lg"
          >
            <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
          </Button>
        ) : (
          <Button onClick={() => setIsAuthModalOpen(true)} className="w-full h-12 bg-white text-slate-900 hover:bg-slate-200 font-black uppercase tracking-widest rounded-full">
            Sign In to Start
          </Button>
        )}
      </div>
    </section>
  );
}
