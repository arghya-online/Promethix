import React from "react";
import { Button } from "@/components/ui/button";

export default function CustomProduct() {
  const whatsappNumber = "919999999999"; // Replace with actual number
  const message = encodeURIComponent("Hi Promethix3D, I have a custom 3D printing request.");

  return (
    <div className="min-h-screen bg-background text-text-primary px-6 py-16">
      <div className="max-w-7xl mx-auto text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white">
          Your Idea, <span className="text-primary">Printed.</span>
        </h1>
        <p className="text-xl text-text-secondary">
          From prototyping engineering parts to creating personalized gifts, we bring your concepts to life with precision 3D printing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left py-12">
          {[
            { title: "Share Your Design", desc: "Send us your STL file or just a sketch of what you want to create.", step: 1 },
            { title: "Get a Quote", desc: "We analyze the materials and time required and provide a transparent quote.", step: 2 },
            { title: "Receive Your Part", desc: "We print, post-process, and ship your custom part directly to your door.", step: 3 }
          ].map((item) => (
            <div key={item.step} className="p-6 bg-surface border border-border rounded-2xl group hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 bg-surface-light rounded-full flex items-center justify-center text-primary font-bold mb-4 group-hover:bg-primary group-hover:text-white transition-colors">{item.step}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary p-12 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-heading font-bold mb-6 relative z-10">Ready to start?</h2>
          <Button
            size="lg"
            className="h-14 px-8 text-lg bg-white text-primary hover:bg-surface-light hover:text-white relative z-10"
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')}
          >
            Start Custom Project via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
