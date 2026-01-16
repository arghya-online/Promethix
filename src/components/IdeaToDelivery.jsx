import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageSquare, Printer, Truck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function IdeaToDelivery() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;

        // Horizontal Scroll
        const totalWidth = section.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalWidth - windowWidth + 100; // Extra buffer

        if (windowWidth > 768) { // Only pin on desktop/tablet for better UX
            gsap.to(section, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });
        }
    }, { scope: triggerRef });

    const steps = [
        {
            id: "01",
            icon: <MessageSquare className="w-8 h-8 text-amber-500" />,
            title: "Share Your Idea",
            desc: "Send a sketch, photo, or thought on WhatsApp. We handle the 3D process.",
            bg: "bg-amber-50/50"
        },
        {
            id: "02",
            icon: <Printer className="w-8 h-8 text-blue-500" />,
            title: "We Design & Print",
            desc: "We create the 3D model and print it with industrial precision.",
            bg: "bg-blue-50/50"
        },
        {
            id: "03",
            icon: <Truck className="w-8 h-8 text-emerald-500" />,
            title: "Safe Delivery",
            desc: "Packed with care and shipped to your doorstep. Ready to use.",
            bg: "bg-emerald-50/50",
            action: true
        }
    ];

    return (
        <section className="bg-white overflow-hidden" ref={triggerRef}>
            <div className="h-screen flex items-center w-full">
                <div ref={sectionRef} className="flex gap-8 px-8 md:px-20 min-w-max items-center">

                    {/* INTRO TEXT CARD */}
                    <div className="w-[85vw] md:w-[450px] flex flex-col justify-center pr-12">
                        <div className="w-12 h-1 bg-amber-500 mb-6"></div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
                            The Process
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
                            From Idea <br /> To Reality.
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
                            A simple, guided journey to get your custom 3D prints without technical headaches.
                        </p>
                    </div>

                    {/* STEPS CARDS */}
                    {steps.map((step) => (
                        <div key={step.id} className={`w-[85vw] md:w-[450px] aspect-[4/5] md:aspect-[3/4] ${step.bg} rounded-[2rem] border border-slate-100 p-8 md:p-10 flex flex-col justify-between shadow-xl shadow-slate-200/40 relative group hover:-translate-y-2 transition-transform duration-500`}>

                            {/* Large Background Number */}
                            <span className="absolute -bottom-10 -right-4 text-[12rem] font-black text-white/80 group-hover:text-white transition-colors pointer-events-none select-none z-0">
                                {step.id}
                            </span>

                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm mb-8">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 text-base md:text-lg leading-relaxed">{step.desc}</p>
                            </div>

                            {step.action && (
                                <div className="relative z-10">
                                    <Link to="/custom">
                                        <Button className="w-full h-14 bg-slate-900 text-white hover:bg-black rounded-xl text-sm font-bold tracking-widest uppercase shadow-lg shadow-slate-900/10">
                                            Start Custom Order
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* End Spacer */}
                    <div className="w-[10vw]"></div>
                </div>
            </div>
        </section>
    );
}
