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
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6">
              Refining Reality, <br />
              <span className="text-text-secondary">Layer by Layer.</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              We are Promethix3D – a collective of engineers, designers, and artisans obsessed with the potential of additive manufacturing.
              We don't just print plastic; we forge ideas into tangible, functional art.
            </p>
          </motion.div>
        </div>

        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Stats Grid */}
      <section className="py-12 border-y border-border bg-surface-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary">{stat.value}</h3>
              <p className="text-sm text-text-muted uppercase tracking-wider font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Our Story</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                It started in a small garage in Mumbai, fueled by curiosity and the hum of a single 3D printer.
                What began as a hobby quickly evolved into a passion for solving complex problems through rapid prototyping.
              </p>
              <p>
                We realized that 3D printing wasn't just about making trinkets; it was about democratizing manufacturing.
                It was about giving a hardware startup the ability to test a casing in hours, or an artist the freedom to create impossible geometries.
              </p>
              <p>
                Today, Promethix3D operates a farm of industrial-grade printers, serving clients ranging from aerospace engineers to interior designers.
                Yet, our core mission remains unchanged: to bridge the gap between digital imagination and physical reality.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <div className="aspect-[3/4] bg-surface-light border border-border rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581093458791-9f302e6d8a7a?auto=format&fit=crop&q=80&w=400" alt="3D Printer" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div className="aspect-square bg-surface-light border border-border rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1631541909061-71e349d1f203?auto=format&fit=crop&q=80&w=400" alt="Design Process" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square bg-surface-light border border-border rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1565514020125-99d799f9217e?auto=format&fit=crop&q=80&w=400" alt="Filament" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <div className="aspect-[3/4] bg-surface-light border border-border rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=400" alt="Finished Product" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface text-text-primary border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-primary">Why Promethix?</h2>
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
