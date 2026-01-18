import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

export default function CustomProduct() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  const whatsappNumber = "+919832769269";
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
      className="min-h-screen bg-white text-slate-900 pt-10 md:pt-20 pb-0"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HERO */}
        <div
          ref={heroRef}
          className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-slate-200 bg-slate-50 rounded-none">
            <span className="w-2 h-2 rounded-none bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">
              Custom 3D Printing Service
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            If you can imagine it, <br />
            <span className="text-slate-400">we can print it.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            From prototypes to personalized gifts. No minimum quantity.
            Design support included.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-700">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-none">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> High Precision
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-none">
              <Truck className="w-4 h-4 text-blue-600" /> Pan-India Delivery
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-none">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Quality Checked
            </div>
          </div>

          {/* HERO CTA ROW */}
          <div className="flex flex-col items-center gap-4 mt-10">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <SignedIn>
                <Button
                  onClick={openWhatsApp}
                  className="h-14 px-8 w-full md:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-sm rounded-none shadow-xl hover:scale-[1.03] transition-all duration-300"
                >
                  Start on WhatsApp <MessageCircle className="ml-3 w-5 h-5" />
                </Button>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="h-14 px-8 w-full md:w-auto bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-sm rounded-none shadow-xl hover:scale-[1.03] transition-all duration-300">
                    Sign In to Start
                  </Button>
                </SignInButton>
              </SignedOut>

              <Link to="/products" className="w-full md:w-auto">
                <Button variant="outline" className="h-14 px-8 w-full md:w-auto bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-bold uppercase tracking-widest text-sm rounded-none">
                  Browse Products
                </Button>
              </Link>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Reply in minutes • Quote + timeline
            </p>
          </div>
        </div>

        {/* PROCESS */}
        <div ref={timelineRef} className="mb-12 md:mb-24 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3">How It Works</h2>
            <p className="text-slate-600">Simple steps. Clear workflow.</p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-200" />
            <div className="timeline-line absolute left-[19px] top-4 w-[2px] bg-amber-500 h-0" />

            <div className="space-y-8 md:space-y-10">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="process-step relative pl-16 flex flex-col md:flex-row md:items-start gap-1 md:gap-8"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 bg-white border border-slate-200 flex items-center justify-center z-10 rounded-none">
                    <span className="text-xs font-black text-amber-700">{step.num}</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILE GUIDE */}
        <div className="mb-12 md:mb-24 grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Column 1: HOW TO SEND */}
          <div className="bg-slate-900 text-white rounded-none p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-slate-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-2xl font-black mb-6 relative z-10 flex items-center gap-2">
              <FileUp className="w-6 h-6 text-emerald-400" /> Send Files
            </h3>

            <ul className="space-y-4 relative z-10">
              {[
                "STL / OBJ / STEP files",
                "Reference Images (JPG/PNG)",
                "Canva / PDF Designs",
                "Simply explain in text"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-extrabold text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8 border border-slate-200 bg-slate-50 rounded-none">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900">
              <MessageCircle className="w-6 h-6" /> What to Mention
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-none">
                <Ruler className="size-4 text-amber-600" />
                <span className="text-sm font-bold text-slate-800">
                  Approx. Size (e.g. 10cm tall)
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-none">
                <PenTool className="size-4 text-amber-600" />
                <span className="text-sm font-bold text-slate-800">
                  Color Preference (e.g. Matte Black)
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-none">
                <Box className="size-4 text-amber-600" />
                <span className="text-sm font-bold text-slate-800">
                  Application (e.g. Outdoor use)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16 md:mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-3">FAQs</h2>
            <p className="text-slate-600">Quick answers to common questions.</p>
          </div>
          <Accordion items={faqs} />
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="bg-slate-950 text-white w-full py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-amber-500 font-bold tracking-widest uppercase mb-4 text-xs">
            Ready to build?
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            Start your custom order
          </h2>

          <div className="flex flex-col items-center gap-6">
            <SignedIn>
              <Button
                onClick={openWhatsApp}
                className="h-16 px-10 bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest text-base rounded-none shadow-xl hover:scale-[1.03] transition-all duration-300"
              >
                Chat on WhatsApp <MessageCircle className="ml-3 w-6 h-6" />
              </Button>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button className="h-16 px-10 bg-white text-slate-900 hover:bg-slate-100 font-black uppercase tracking-widest text-base rounded-none">
                  Sign In to Start
                </Button>
              </SignInButton>
            </SignedOut>

            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Fast replies • Design support included • Tracked delivery
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:hidden z-50">
        <SignedIn>
          <Button
            onClick={openWhatsApp}
            className="w-full h-12 bg-[#25d366] hover:bg-[#20ba5a] text-white font-black uppercase tracking-widest rounded-none shadow-lg"
          >
            <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
          </Button>
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <Button className="w-full h-12 bg-slate-950 text-white font-black uppercase tracking-widest rounded-none">
              Sign In to Start
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </section>
  );
}
