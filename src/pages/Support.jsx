import React, { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Support() {
    const faqData = [
        { title: "Do I need to have a 3D file ready?", content: "Nope. You don’t need any 3D file. Just share your idea, a reference photo, sketch, or even explain it in text - we’ll design the 3D model for you." },
        { title: "Can I directly buy models from your website?", content: "Yes. You can explore our product collection, pick the model you like, and place the order directly from the website." },
        { title: "Do you take custom orders?", content: "Yes, absolutely. Custom work is our main thing - tell us what you want, and we’ll design + print it based on your requirements." },
        { title: "What kind of products do you make?", content: "A lot of different things, like: home decor & artifacts, anime/cartoon figurines, customized gifts & mementoes, idols (gods and goddesses), lithophanes, mechanical parts for projects, prototypes & custom models. If it can be modelled, we can most likely print it." },
        { title: "Can you print mechanical parts for my project?", content: "Yes. Students and makers order custom parts from us all the time. Just share your requirement or measurements and we’ll handle the rest." },
        { title: "What materials do you use?", content: "We use high-quality 3D printing materials (PLA+, PETG, etc.) depending on the product type and usage. If your model needs extra strength or a certain finish, we’ll recommend the best option." },
        { title: "How long does it take to complete an order?", content: "It depends on model size, detailing, design time (for custom orders), and delivery location. We always share an estimated timeline after confirming your order." },
        { title: "Do you deliver outside your city?", content: "Yes. Delivery is available to your required location." },
        { title: "Will I get to approve the design before printing?", content: "For custom orders - yes. We share the design preview/renders first, and printing starts only after your confirmation." },
        { title: "Can I request changes in the design?", content: "Yes. Small changes are possible before printing begins. Just tell us clearly during the design approval stage." },
        { title: "Is COD (Cash on Delivery) available?", content: "It depends on the product type and delivery location. For most custom orders, confirmation/payment is required before printing starts (since it’s made specifically for you)." },
        { title: "Can I cancel my order?", content: "Ready-made shop products: cancellation possible if not shipped. Custom orders: only possible before printing starts. Once printing begins, cancellation isn’t possible." }
    ];

    const policyData = [
        {
            title: "Shipping & Delivery",
            content: (
                <div className="space-y-4">
                    <p>
                        We deliver products to your required location. Since 3D printed models can be delicate, we focus heavily on
                        safe packaging so the model reaches you in perfect condition.
                    </p>

                    <div className="space-y-2">
                        <p className="font-semibold text-primary">Processing Time</p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-text-secondary">
                            <li>Ready-made shop products: dispatched within 2–5 working days.</li>
                            <li>Custom orders: depends on design + print complexity (we confirm timeline clearly).</li>
                        </ul>
                    </div>

                    <div className="text-sm">
                        <span className="font-semibold text-primary">Delivery Time:</span>{" "}
                        <span className="text-text-secondary">3–7 working days after dispatch (location dependent).</span>
                    </div>

                    <div className="rounded-none border border-border bg-white p-4 text-sm">
                        <p className="font-semibold text-primary mb-1">Package damaged?</p>
                        <p className="text-text-secondary">
                            Please record an unboxing video immediately, take photos, and contact us within <b>48 hours</b>.
                        </p>
                    </div>
                </div>
            )
        },
        {
            title: "Refund / Replacement Policy",
            content: (
                <div className="space-y-5">
                    <p>
                        We want you to love what you receive. Since many products are 3D printed/custom, refunds depend on the
                        situation.
                    </p>

                    <div className="rounded-none border border-border bg-white p-4">
                        <p className="font-semibold text-primary mb-1">Ready-made products</p>
                        <p className="text-sm text-text-secondary">
                            Eligible for replacement/refund if: wrong product, damaged arrival, or clear manufacturing defect.
                            (Request within 48 hours with an unboxing video.)
                        </p>
                    </div>

                    <div className="rounded-none border border-border bg-white p-4">
                        <p className="font-semibold text-primary mb-1">Custom orders</p>
                        <p className="text-sm text-text-secondary">
                            Not eligible if printing has started or you changed your mind. Eligible only if damaged in shipping,
                            clearly different from approved design, or print defect.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    // Search
    const [query, setQuery] = useState("");
    const filteredFAQ = useMemo(() => {
        if (!query.trim()) return faqData;
        const q = query.toLowerCase();
        return faqData.filter(item =>
            item.title.toLowerCase().includes(q) || String(item.content).toLowerCase().includes(q)
        );
    }, [query, faqData]);

    const handleWhatsAppClick = () => {
        const phoneNumber = "919832769269";
        const message = "Hi Promethix3D, I have a query regarding a custom order / product.";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-16">

                {/* HERO */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto space-y-4"
                >
                    <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
                        Support & Help Center
                    </p>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight">
                        Need help? We’re here.
                    </h1>
                    <p className="text-base md:text-lg text-text-secondary">
                        Find quick answers below, or message us directly for custom orders and support.
                    </p>
                </motion.div>

                {/* SEARCH */}
                <div className="mt-10 max-w-3xl mx-auto">
                    <div className="flex items-center gap-3 border border-border bg-white px-4 h-12 rounded-none shadow-sm">
                        <Search className="w-5 h-5 text-text-secondary" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search FAQs (delivery, custom orders, refunds...)"
                            className="w-full bg-transparent outline-none text-sm"
                        />
                    </div>
                </div>

                {/* MAIN GRID */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 items-start">

                    {/* LEFT: FAQ + POLICIES */}
                    <div className="space-y-10">

                        {/* FAQ */}
                        <section className="rounded-none border border-border bg-surface p-6 md:p-8">
                            <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
                                <div>
                                    <h2 className="text-2xl font-heading font-bold text-primary">
                                        Frequently Asked Questions
                                    </h2>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Quick answers. No confusion.
                                    </p>
                                </div>
                                <p className="text-xs text-text-secondary">
                                    Showing <b className="text-primary">{filteredFAQ.length}</b> results
                                </p>
                            </div>

                            <Accordion items={filteredFAQ} />
                        </section>

                        {/* POLICIES */}
                        <section className="rounded-none border border-border bg-surface p-6 md:p-8">
                            <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                                Shipping & Policies
                            </h2>
                            <p className="text-sm text-text-secondary mb-6">
                                Clear policies, simple process.
                            </p>

                            <Accordion items={policyData} />
                        </section>

                    </div>

                    {/* RIGHT: CONTACT CARD */}
                    <aside className="lg:sticky lg:top-8">
                        <div className="rounded-none border border-border bg-white p-6 md:p-8 shadow-sm">
                            <h3 className="text-xl font-heading font-bold text-primary">
                                Contact Support
                            </h3>
                            <p className="text-sm text-text-secondary mt-2">
                                For custom orders, changes, delivery queries - message us directly.
                            </p>

                            <div className="mt-7 space-y-5">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-none border border-border flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-primary">Call</p>
                                        <p className="text-text-secondary">+91 9832769269</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-none border border-border flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-primary">Email</p>
                                        <p className="text-text-secondary">promethix3d@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-none border border-border flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-primary">Location</p>
                                        <p className="text-text-secondary">India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button onClick={handleWhatsAppClick} className="w-full h-12 rounded-none bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold tracking-wide uppercase shadow-lg shadow-green-900/20">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat on WhatsApp
                                </Button>

                                <p className="text-xs text-text-secondary text-center mt-3">
                                    Usually replies within a few hours.
                                </p>
                            </div>
                        </div>

                        {/* SMALL TRUST STRIP */}
                        <div className="mt-5 rounded-none border border-border bg-surface p-5 text-sm text-text-secondary">
                            <p className="font-semibold text-primary mb-1">Tip</p>
                            For faster custom orders, send:
                            <span className="text-primary font-semibold"> reference images</span>,
                            <span className="text-primary font-semibold"> dimensions</span>, or your
                            <span className="text-primary font-semibold"> STL file</span>.
                        </div>
                    </aside>
                </div>

                {/* MOBILE STICKY CTA */}
                <div className="fixed bottom-4 left-0 right-0 px-4 lg:hidden">
                    <Button onClick={handleWhatsAppClick} className="w-full h-12 rounded-none bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold tracking-wide uppercase shadow-lg">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat on WhatsApp
                    </Button>
                </div>

            </div>
        </div>
    );
}
