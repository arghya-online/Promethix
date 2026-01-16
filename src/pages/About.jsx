import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Lightbulb, PenTool } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Prints Delivered", value: "10k+" },
    { label: "Custom Projects", value: "500+" },
    { label: "Engineering Hours", value: "15k+" },
    { label: "Happy Makers", value: "2.5k+" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Main Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              About PROMETHIX3D3D
            </h1>
            <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 text-lg text-text-secondary leading-relaxed font-medium">
              <p>
                We’re PROMETHIX3D3D, a Kolkata-based 3D design and 3D printing startup.
              </p>
              <p>
                We make all kinds of 3D printed stuff — from <span className="text-primary font-bold">cool decor and artifacts</span> to <span className="text-primary font-bold">anime figurines</span>, custom gifts, <span className="text-primary font-bold">mementoes, idols</span>, lithophanes, and even <span className="text-primary font-bold">mechanical parts</span> for academic projects.
              </p>
              <p>
                You can explore our ready-made models in the shop and directly order what you like.
                And if you want something custom, just share your requirement — even if you don’t have a 3D file.
              </p>
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl mt-6">
                <p className="font-bold text-primary text-base">
                  Just tell us the idea. <br />
                  <span className="font-normal text-slate-600">We’ll design it properly, print it with clean detailing, and deliver it safely to your location.</span>
                </p>
              </div>
            </div>

            {/* Visual Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1581093458791-9f302e6d8a7a?auto=format&fit=crop&q=80&w=400" alt="3D Printer" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80&w=400" alt="Design Process" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1565514020125-99d799f9217e?auto=format&fit=crop&q=80&w=400" alt="Filament" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] bg-surface-light border border-border rounded-2xl overflow-hidden shadow-sm -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=400" alt="Finished Product" className="w-full h-full object-cover" />
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
            <p className="text-text-secondary mt-4">We are driven by three core principles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Uncompromising Quality", desc: "We inspect every millimeter. If it's not perfect, it doesn't leave our shop." },
              { icon: Lightbulb, title: "Creative Sotuions", desc: "We don't just print; we consult. We help optimize your designs for best results." },
              { icon: Users, title: "Community First", desc: "We believe in checking knowledge and empowering the next generation of makers." }
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
