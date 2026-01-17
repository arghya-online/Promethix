import React from "react";
import { Upload, Printer, Truck } from "lucide-react";

export function IdeaToDelivery() {
    const steps = [
        {
            id: 1,
            icon: <Upload className="w-8 h-8 text-slate-800" strokeWidth={1} />,
            title: "1. Upload or Choose",
            desc: "Pick a product from our store or share your custom requirement with us. Even a photo or rough idea works.",
            bgIcon: "text-amber-500", // Optional if needed for specific coloring, but screenshot shows consistent style
        },
        {
            id: 2,
            icon: <Printer className="w-8 h-8 text-slate-800" strokeWidth={1} />,
            title: "2. Precision Print",
            desc: "We design (if needed) and print your model with clean detailing and proper strength.",
        },
        {
            id: 3,
            icon: <Truck className="w-8 h-8 text-slate-800" strokeWidth={1} />,
            title: "3. Fast Delivery",
            desc: "We finish it, pack it safely, and deliver it to your location.",
        },
    ];

    return (
        <section className="py-24 bg-[#fafbfc]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Header */}
                <div className="mb-20">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 block mb-4">
                        FROM FILE TO PHYSICAL
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                        Simple, smooth, and beginner-friendly.
                    </h2>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center group">
                            {/* Icon Circle */}
                            <div className={`w-24 h-24 rounded-full border border-slate-200 bg-white flex items-center justify-center mb-8`}>
                                <div className={`${step.id === 1 ? "text-amber-600" : "text-slate-400"}`}>
                                    {/* In the screenshot, the first icon is amber/colored, others are greyish blue? 
                       Wait, looking closely at the screenshot... 
                       First icon: Orange outline/color.
                       Second icon: Blue/Grey.
                       Third icon: Blue/Grey.
                       Let's refine the colors based on the screenshot better in a moment or stick to a clean slate.
                       The screenshot shows: 
                       1. Upload icon: Orange/Amber color.
                       2. Printer icon: Blueish grey.
                       3. Truck icon: Blueish grey.
                   */}
                                    {step.id === 1 ? (
                                        <Upload className="w-8 h-8 text-amber-500" strokeWidth={1.5} />
                                    ) : step.id === 2 ? (
                                        <Printer className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                                    ) : (
                                        <Truck className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-serif text-slate-900 mb-4">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
