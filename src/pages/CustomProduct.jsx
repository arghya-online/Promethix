import React from "react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function CustomProduct() {
  const whatsappNumber = "919999999999";
  const message = encodeURIComponent(
    "Hi Promethix3D, I have a custom 3D printing request."
  );

  return (
    <section className="min-h-screen bg-background text-text-primary">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* HERO TEXT */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-primary">
            You Imagine It.
            <span className="text-text-secondary block sm:inline">
              We Print It Right.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed">
            From engineering prototypes to personalized creations, we turn your
            ideas into precise, production-ready 3D printed parts.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {[
            {
              step: "01",
              title: "Share Your Design",
              desc: "Upload an STL file or simply explain your idea. Even rough sketches work.",
            },
            {
              step: "02",
              title: "Get a Quote",
              desc: "We evaluate material, print time, and finishing to give you a clear quote.",
            },
            {
              step: "03",
              title: "Receive Your Part",
              desc: "We print, post-process, quality check, and ship directly to you.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group relative bg-surface border border-border p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="text-sm font-mono text-text-secondary mb-6">
                {item.step}
              </div>

              <h3 className="text-lg font-semibold text-primary mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>

              {/* hover accent */}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-20 overflow-hidden rounded-xl border border-border bg-primary text-white">
          {/* background glow */}
          <div className="absolute inset-0">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
          </div>

          <div className="relative z-10 px-6 py-14 md:px-12 md:py-20 text-center space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
              Ready to start your custom print?
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base text-white/80">
              Talk directly with our team, share your requirements, and get your
              project moving today.
            </p>

            <div className="flex justify-center">
              <SignedIn>
                <Button
                  size="lg"
                  className="h-14 px-10 bg-white text-primary hover:bg-slate-200 font-semibold tracking-wide rounded-md"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${whatsappNumber}?text=${message}`,
                      "_blank"
                    )
                  }
                >
                  Start via WhatsApp
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    className="h-14 px-10 bg-white text-primary hover:bg-slate-200 font-semibold tracking-wide rounded-md"
                  >
                    Sign In to Start Project
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
