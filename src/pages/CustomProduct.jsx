import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function CustomProduct() {
  const whatsappNumber = "+919832769269";
  const message = encodeURIComponent(
    "Hi PROMETHIX3D3D, I have a custom 3D printing request."
  );

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 font-sans">
      <div className="max-w-[1100px] mx-auto px-6">

        {/* HERO HEADER */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Want something unique?
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium">
            This is where the fun begins.
          </p>
        </div>

        {/* CONSOLIDATED CARD */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">

          {/* TOP GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* LEFT: You can request */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What You Can Request
              </h3>
              <ul className="space-y-4">
                {[
                  "Custom figurines (anime/cartoon/people)",
                  "Personalized name models / gifts",
                  "Mementoes & Idols",
                  "Lithophanes (photo-to-3D prints)",
                  "Engineering / academic project parts",
                  "Mechanical components",
                  "Prototypes for your product idea"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: How to share */}
            <div className="p-8 md:p-12 bg-slate-50/50">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 uppercase tracking-wider text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                How To Share
              </h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Image references",
                  "Rough sketch",
                  "Measurements",
                  "Or just explain in text"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xs">✓</span>
                    <span className="font-bold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-500 italic leading-relaxed">
                "Our designers will create the model, share a preview, and once you approve — we print and deliver."
              </p>
            </div>

          </div>

          {/* CTA STRIP (Joined) */}
          <div className="bg-slate-900 border-t border-slate-800 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to start your custom print?
              </h2>
              <p className="text-slate-400">
                Send your idea or STL file on WhatsApp and we’ll take it from there.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <SignedIn>
                <Button
                  size="lg"
                  className="h-14 px-8 bg-amber-500 hover:bg-amber-400 text-black font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-amber-900/20"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${message}`,
                      "_blank"
                    )
                  }
                >
                  Start on WhatsApp
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className="h-14 px-8 bg-white hover:bg-slate-100 text-slate-900 font-bold tracking-widest uppercase rounded-xl transition-all"
                  >
                    Sign In to Start
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
