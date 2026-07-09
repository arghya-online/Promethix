import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Printer, Truck, FileCheck, Layers, FlaskConical, Sparkles, Box, Gift, MapPin, AlertCircle } from "lucide-react";

export function HowWeWork() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    return (
        <div className="bg-white min-h-screen pt-12 md:pt-20 pb-10 md:pb-16">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        How We Work
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We like to keep things simple and transparent. Here’s how we take your idea (or file) and turn it into a real printed product - and make sure it reaches you safely.
                    </p>
                </div>

                {/* Section 1: Design & 3D Printing */}
                <section id="design" className="mb-10 md:mb-16 scroll-mt-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-none bg-amber-100 flex items-center justify-center text-amber-600">
                            <Printer className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Design + 3D Printing</h2>
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600">
                        <p className="mb-8">
                            We don’t just press “print” and hope for the best. We properly check the model and print it with the best settings for clean finishing and good strength.
                        </p>

                        <div className="space-y-8 not-prose">

                            {/* Model Check */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <FileCheck className="w-5 h-5 text-amber-500" /> Model Check
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Before printing, we quickly verify your file for basic things like wall thickness, fit, and overall printability - so there are fewer chances of failure.
                                </p>
                            </div>

                            {/* Clean Printing */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-amber-500" /> Clean Printing
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    We print in clean layer settings (usually around 0.1mm to 0.2mm) depending on the model. This helps keep the surface smooth and the print strong.
                                </p>
                            </div>

                            {/* Material Selection */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <FlaskConical className="w-5 h-5 text-amber-500" /> Material Selection
                                </h3>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    For normal models and decor, we usually use PLA+ (strong, clean finish, eco-friendly).
                                </p>
                                <p className="text-slate-600 leading-relaxed">
                                    For functional/mechanical parts that need extra strength or heat resistance, we can print in PETG/ABS depending on what your project needs.
                                </p>
                            </div>

                            {/* Finishing Touch */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-500" /> Finishing Touch
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    After printing, we remove supports, clean edges, and do a final quality check before packing.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                <div className="w-full h-px bg-slate-100 mb-10 md:mb-16"></div>

                {/* Section 2: Safe Packing + Delivery */}
                <section id="shipping" className="scroll-mt-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-none bg-blue-100 flex items-center justify-center text-blue-600">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Safe Packing + Delivery</h2>
                    </div>

                    <div className="prose prose-slate lg:prose-lg max-w-none text-slate-600">
                        <p className="mb-8">
                            3D prints can break if packed badly - and we don’t want that at all. So we pack every order properly and safely.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">

                            {/* Strong Packaging */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Box className="w-5 h-5 text-blue-500" /> Strong Packaging
                                </h3>
                                <p className="text-sm">We use layered packing like bubble wrap, strong box packing, and fillers so the product doesn’t move around during shipping.</p>
                            </div>

                            {/* Clean + Professional */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <Gift className="w-5 h-5 text-blue-500" /> Clean + Professional
                                </h3>
                                <p className="text-sm">Packaging is neat and safe, and it also works well if you’re gifting it to someone directly.</p>
                            </div>

                            {/* Delivery with Tracking */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-500" /> Delivery with Tracking
                                </h3>
                                <p className="text-sm">We ship using reliable courier services and share tracking details once dispatched. Delivery time depends on location, but usually takes a few working days.</p>
                            </div>

                            {/* If It Arrives Damaged */}
                            <div className="bg-slate-50 p-6 rounded-none border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-500" /> If It Arrives Damaged
                                </h3>
                                <p className="text-sm">In rare cases, if the product arrives damaged, just send us the unboxing video within 24 hours, and we’ll help you with a replacement.</p>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default HowWeWork;
