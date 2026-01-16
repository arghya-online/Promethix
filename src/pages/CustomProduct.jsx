import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Ruler, FileUp, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export default function CustomProduct() {
  const whatsappNumber = "+919832769269";
  const message = encodeURIComponent("Hi PROMETHIX3D, I have a custom 3D printing request.");

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const requestItems = [
    "Custom figurines (anime/cartoon/people)",
    "Personalized gifts & name models",
    "Mementoes, trophies & idols",
    "Lithophanes (photo-to-3D prints)",
    "Engineering project parts",
    "Prototypes & mechanical components"
  ];

  const shareItems = [
    { icon: <FileUp className="w-4 h-4" />, text: "STL file / CAD file (optional)" },
    { icon: <Sparkles className="w-4 h-4" />, text: "Reference images / link" },
    { icon: <Ruler className="w-4 h-4" />, text: "Measurements (if needed)" },
    { icon: <MessageCircle className="w-4 h-4" />, text: "Or just explain in text" }
  ];

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-28">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-slate-200 bg-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-600">
              Custom 3D Design + Printing
            </p>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Tell us the idea.
            <span className="block text-slate-500 font-extrabold">
              We’ll design + print it.
            </span>
          </h1>

          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            No 3D file? No problem. Share your requirement on WhatsApp — we’ll guide you from design preview to final delivery.
          </p>

          {/* Trust Row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: <BadgeCheck className="w-4 h-4" />, text: "Design Preview Before Print" },
              { icon: <ShieldCheck className="w-4 h-4" />, text: "Quality Checked Prints" },
              { icon: <Truck className="w-4 h-4" />, text: "Safe Packaging + Delivery" }
            ].map((t) => (
              <div
                key={t.text}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-700 shadow-sm"
              >
                {t.icon}
                <span className="font-semibold">{t.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MAIN CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60">

          {/* Upper Content */}
          <div className="p-6 md:p-10">

            {/* Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* What you can request */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  What you can request
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                  Custom prints for almost anything.
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {requestItems.map((item) => (
                    <span
                      key={item}
                      className="text-sm font-semibold text-slate-700 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to share */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                  How to share details
                </p>
                <h3 className="mt-3 text-xl font-extrabold text-slate-900">
                  Send us anything that explains it.
                </h3>

                <div className="mt-5 space-y-3">
                  {shareItems.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <p className="text-sm font-bold text-slate-700">{item.text}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-sm text-slate-600">
                  We’ll make the model, share a preview, and print only after you approve.
                </p>
              </div>
            </div>

            {/* 3-Step Flow */}
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "1) Share requirement",
                  desc: "Message us your idea, sketch, STL, or reference images."
                },
                {
                  title: "2) Design preview",
                  desc: "We design and share preview for approval before printing."
                },
                {
                  title: "3) Print & deliver",
                  desc: "We print with clean finish, pack safely, and deliver."
                }
              ].map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="font-extrabold text-slate-900">{step.title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* CTA STRIP */}
          <div className="relative overflow-hidden border-t border-slate-200 bg-slate-950 px-6 md:px-10 py-8">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-500/15 blur-[90px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-[90px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                  Ready to start?
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-black text-white">
                  Start your custom print on WhatsApp
                </h2>
                <p className="mt-2 text-slate-400 max-w-xl">
                  Send your idea or STL file — we’ll reply with design options, pricing, and timeline.
                </p>
              </div>

              <div className="flex-shrink-0">
                <SignedIn>
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-2xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold uppercase tracking-widest shadow-xl shadow-green-900/25 transition-transform hover:-translate-y-0.5"
                    onClick={openWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start on WhatsApp
                  </Button>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      className="h-14 px-8 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold uppercase tracking-widest transition-transform hover:-translate-y-0.5"
                    >
                      Sign In to Start
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY CTA */}
        <div className="fixed bottom-4 left-0 right-0 px-4 md:hidden">
          <SignedIn>
            <Button
              className="w-full h-12 rounded-2xl bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold uppercase tracking-widest shadow-xl shadow-green-900/25"
              onClick={openWhatsApp}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Custom Order
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full h-12 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold uppercase tracking-widest shadow-xl shadow-slate-900/10">
                Sign In to Start
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

      </div>
    </section>
  );
}
