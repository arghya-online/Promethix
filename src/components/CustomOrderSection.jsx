import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FileUp,
    Image as ImageIcon,
    PenTool,
    Ruler,
    MessageSquare,
    MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CustomOrderBg from "../assets/HeroImages/custom-order-bg.png"; // Realistic Bg

gsap.registerPlugin(ScrollTrigger);

export function CustomOrderSection() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header
            if (headerRef.current) {
                gsap.from(headerRef.current.children, {
                    y: 16,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    },
                });
            }

            // Cards
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    y: 22,
                    opacity: 0,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                    },
                });
            }

            // Checklist
            gsap.from(".checklist-item", {
                y: 10,
                opacity: 0,
                duration: 0.45,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                },
            });

            // Timeline
            gsap.from(".timeline-item", {
                y: 10,
                opacity: 0,
                duration: 0.45,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                },
            });

            // CTA
            if (ctaRef.current) {
                gsap.from(ctaRef.current, {
                    y: 12,
                    opacity: 0,
                    duration: 0.55,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 90%",
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);



    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={CustomOrderBg}
                    alt="Cozy realistic workspace with 3D prints"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[2px]"></div>
            </div>

            <div className="max-w-[1100px] mx-auto px-6 relative z-10">

                {/* HEADER */}
                <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-500 mb-3">
                        Custom Orders
                    </p>

                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        You imagine it.
                        <br className="hidden md:block" />
                        We print it.
                    </h2>

                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                        Don't stress about files. Just define what you need, and we'll handle the rest.
                    </p>
                </div>

                {/* CARDS */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                >
                    {/* LEFT */}
                    <div className="border border-white/10 rounded-none p-7 md:p-9 bg-slate-900/50 backdrop-blur-md">
                        <h3 className="text-lg font-black text-white mb-1">
                            Just share whatever you have
                        </h3>
                        <p className="text-sm text-slate-400 mb-6">
                            Seriously, we can work with anything.
                        </p>

                        <div className="space-y-4">
                            <ChecklistItem icon={<FileUp />} text="Have a 3D file? Great!" />
                            <ChecklistItem icon={<ImageIcon />} text="Photo from Pinterest/Instagram" />
                            <ChecklistItem icon={<PenTool />} text="A rough doodle on paper" />
                            <ChecklistItem icon={<Ruler />} text="Rough size/dimensions" />
                            <ChecklistItem icon={<MessageSquare />} text="Or just explain in voice note" />
                        </div>

                        <p className="mt-6 text-sm text-slate-500">
                            We'll figure out the technical stuff.
                        </p>
                    </div>

                    {/* RIGHT */}
                    <div className="border border-white/10 rounded-none p-7 md:p-9 bg-slate-900/50 backdrop-blur-md">
                        <h3 className="text-lg font-black text-white mb-1">
                            What happens next
                        </h3>
                        <p className="text-sm text-slate-400 mb-6">
                            Simple and transparent workflow.
                        </p>

                        <div className="relative">
                            {/* vertical line */}
                            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-white/10" />

                            <div className="space-y-6">
                                <TimelineItem
                                    number="01"
                                    title="Chat with us"
                                    desc="WhatsApp us your idea."
                                />
                                <TimelineItem
                                    number="02"
                                    title="See a preview"
                                    desc="We show you how it looks first."
                                />
                                <TimelineItem
                                    number="03"
                                    title="Get it delivered"
                                    desc="We print and ship it to you."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="text-center">
                    <Link to="/custom">
                        <Button
                            className="h-14 px-8 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-widest text-sm rounded-none shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-400/50"
                        >
                            Start Custom Order <MessageCircle className="ml-3 w-5 h-5" />
                        </Button>
                    </Link>

                    <p className="mt-3 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        We’ll guide you step-by-step
                    </p>
                </div>
            </div>
        </section>
    );
}

/* components */

function ChecklistItem({ icon, text }) {
    return (
        <div className="checklist-item flex items-center gap-3">
            <div className="w-9 h-9 rounded-none border border-white/20 flex items-center justify-center text-amber-400 bg-white/5">
                {React.cloneElement(icon, { size: 16, strokeWidth: 2.4 })}
            </div>
            <p className="text-sm font-bold text-slate-200">{text}</p>
        </div>
    );
}

function TimelineItem({ number, title, desc }) {
    return (
        <div className="timeline-item relative flex items-start gap-4 pl-10">
            {/* dot */}
            <div className="absolute left-[10px] top-[6px] w-4 h-4 rounded-none bg-slate-900 border-2 border-slate-700" />

            {/* number */}
            <div className="w-10 h-10 rounded-none bg-white text-slate-900 flex items-center justify-center text-xs font-black shrink-0">
                {number}
            </div>

            {/* content */}
            <div>
                <p className="text-sm font-black text-white">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
            </div>
        </div>
    );
}
