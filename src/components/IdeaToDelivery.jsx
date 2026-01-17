import React from "react";
import { Upload, Printer, Truck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
    {
        id: 1,
        stepLabel: "Step 01",
        icon: <Upload className="w-6 h-6" />,
        title: "Send Your Idea",
        desc: "Choose from our shop or WhatsApp your custom idea, image, sketch, or STL file.",
        cta: "Start custom order",
        link: "/custom",
    },
    {
        id: 2,
        stepLabel: "Step 02",
        icon: <Printer className="w-6 h-6" />,
        title: "We Design + Print",
        desc: "We prepare the 3D model, confirm details with you, and print with industrial precision.",
        cta: "Learn about process",
        link: "/how-we-work#design",
    },
    {
        id: 3,
        stepLabel: "Step 03",
        icon: <Truck className="w-6 h-6" />,
        title: "Packed & Delivered",
        desc: "Quality checked, safely packed, and delivered to your doorstep ready to use.",
        cta: "View shipping info",
        link: "/how-we-work#shipping",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export function IdeaToDelivery() {
    return (
        <section className="py-20 md:py-24 bg-[#fafbfc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600 block mb-4">
                        From File to Physical
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                        From idea to delivery — <br className="hidden md:block" />
                        in 3 simple steps.
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Pick a model from our shop or send your custom request. We handle
                        the design, printing, and delivery so you don't have to.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
                >
                    {steps.map((step) => (
                        <motion.div
                            key={step.id}
                            variants={itemVariants}
                            whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm transition-all duration-300 group cursor-default relative overflow-hidden"
                        >
                            {/* Clickable Link Overlay */}
                            <Link to={step.link} className="absolute inset-0 z-20" />

                            {/* Subtle Gradient Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full pointer-events-none">
                                {/* Step Label */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {step.stepLabel}
                                    </span>
                                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                                    {step.desc}
                                </p>

                                {/* Micro Interaction Link */}
                                <div className="flex items-center text-sm font-bold text-slate-900 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {step.cta} <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="font-medium text-slate-700">
                            Have a custom model in mind?
                        </p>
                        <Link to="/custom">
                            <Button className="bg-slate-900 text-white hover:bg-black rounded-lg px-8 h-12 text-sm font-bold tracking-wide transition-transform hover:scale-105">
                                Start Custom Order
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
