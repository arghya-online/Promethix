import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Lightbulb, PenTool } from "lucide-react";

export default function About() {


  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Main Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              About PROMETHIX3D
            </h1>
            <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-medium">
              <p>
                We’re PROMETHIX3D, a 3D design and 3D printing startup based in India.
              </p>
              <p>
                We create all kinds of 3D printed products — from <span className="text-primary font-bold">home decor and artifacts</span> to <span className="text-primary font-bold">anime figurines</span>, custom gifts, mementoes, idols, lithophanes, and even <span className="text-primary font-bold">mechanical parts</span> for student and engineering projects.
              </p>
              <p>
                You can browse our ready-made models in the shop and order directly.
                And if you want something custom, just message us your idea - even if you don’t have a 3D file.
              </p>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                <p className="font-bold text-primary text-base">
                  Just tell us what you need. <br />
                  <span className="font-normal text-slate-600">We’ll design it, print it with clean finishing, and deliver it safely to your location.</span>
                </p>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[3/4] bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm rotate-2 hover:rotate-0 transition-transform duration-500 group">
                  <img src="https://images.unsplash.com/photo-1581093458791-9f302e6d8a7a?auto=format&fit=crop&q=80&w=400" alt="3D Printer" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">3D Printer</div>
                </div>
                <div className="relative aspect-square bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm -rotate-2 hover:rotate-0 transition-transform duration-500 group">
                  <img src="https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80&w=400" alt="Design Process" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Design Process</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative aspect-square bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm rotate-2 hover:rotate-0 transition-transform duration-500 group">
                  <img src="https://images.unsplash.com/photo-1565514020125-99d799f9217e?auto=format&fit=crop&q=80&w=400" alt="Filament Material" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Filament Material</div>
                </div>
                <div className="relative aspect-[3/4] bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm -rotate-2 hover:rotate-0 transition-transform duration-500 group">
                  <img src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=400" alt="Final Product" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Final Product</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface text-text-primary border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary">Why PROMETHIX3D?</h2>
            <p className="text-text-secondary mt-4">We keep things simple, and we focus on what really matters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Quality First", desc: "Every print is checked properly. If it doesn’t look right, we don’t ship it." },
              { icon: Lightbulb, title: "Smart Design Support", desc: "We don’t just print files - we help improve the design so the final output looks better and works better." },
              { icon: Users, title: "Community Driven", desc: "We love building for students, creators, and makers. We’re here to support learning and help people bring ideas to life." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 border border-border group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-none mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
