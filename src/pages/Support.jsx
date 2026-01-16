import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Support() {
    const faqData = [
        { title: "1. Do I need to have a 3D file ready?", content: "Nope. You don’t need any 3D file. Just share your idea, a reference photo, sketch, or even explain it in text — we’ll design the 3D model for you." },
        { title: "2. Can I directly buy models from your website?", content: "Yes. You can explore our product collection, pick the model you like, and place the order directly from the website." },
        { title: "3. Do you take custom orders?", content: "Yes, absolutely. Custom work is our main thing — tell us what you want, and we’ll design + print it based on your requirements." },
        { title: "4. What kind of products do you make?", content: "A lot of different things, like: home decor & artifacts, anime/cartoon figurines, customized gifts & mementoes, idols (gods and goddesses), lithophanes, mechanical parts for projects, prototypes & custom models. If it can be modelled, we can most likely print it." },
        { title: "5. Can you print mechanical parts for my project?", content: "Yes. Students and makers order custom parts from us all the time. Just share your requirement or measurements and we’ll handle the rest." },
        { title: "6. What materials do you use?", content: "We use high-quality 3D printing materials (PLA+, PETG, etc.) depending on the product type and usage. If your model needs extra strength or a certain finish, we’ll recommend the best option." },
        { title: "7. How long does it take to complete an order?", content: "It depends on model size, detailing, design time (for custom orders), and delivery location. We always share an estimated timeline after confirming your order." },
        { title: "8. Do you deliver outside your city?", content: "Yes. Delivery is available to your required location." },
        { title: "9. Will I get to approve the design before printing?", content: "For custom orders — yes. We share the design preview/renders first, and printing starts only after your confirmation." },
        { title: "10. Can I request changes in the design?", content: "Yes. Small changes are possible before printing begins. Just tell us clearly during the design approval stage." },
        { title: "11. Is COD (Cash on Delivery) available?", content: "It depends on the product type and delivery location. For most custom orders, confirmation/payment is required before printing starts (since it’s made specifically for you)." },
        { title: "12. Can I cancel my order?", content: "Ready-made shop products: cancellation possible if not shipped. Custom orders: only possible before printing starts. Once printing begins, cancellation isn’t possible." },
    ];

    const policyData = [
        {
            title: "Shipping & Delivery",
            content: (
                <div className="space-y-4">
                    <p>We deliver products to your required location. Since 3D printed models can be delicate, we focus heavily on safe packaging so the model reaches you in perfect condition.</p>
                    <div>
                        <strong>Processing Time:</strong>
                        <ul className="list-disc pl-5 mt-1">
                            <li>Ready-made shop products: Usually dispatched within 2–5 working days.</li>
                            <li>Custom orders: Time depends on design + printing complexity. We confirm estimated time clearly.</li>
                        </ul>
                    </div>
                    <div>
                        <strong>Delivery Time:</strong> After dispatch, 3–7 working days depending on location.
                    </div>
                    <p>Once shipped, we’ll share tracking details. Please ensure your address is correct. If returned due to wrong address, re-shipping charges may apply.</p>
                    <div>
                        <strong>Damaged Package?</strong>
                        <p>If arrives damaged: record an unboxing video immediately, take photos, and contact us within 48 hours.</p>
                    </div>
                </div>
            )
        },
        {
            title: "Refund / Replacement Policy",
            content: (
                <div className="space-y-4">
                    <p>We want you to love what you receive. But since most products are 3D printed/custom, refunds depend on the situation.</p>

                    <div>
                        <strong className="text-emerald-600 block mb-1">1) Ready-Made Products</strong>
                        <p className="text-sm">Eligible for replacement/refund if: wrong product, damaged arrival, or clear manufacturing defect. (Request within 48 hrs with unboxing video).</p>
                    </div>

                    <div>
                        <strong className="text-amber-600 block mb-1">2) Custom Orders</strong>
                        <p className="text-sm">NOT eligible for refund if: you changed mind after printing started or don't like design after keeping it. <br />ELIGIBLE if: damaged in shipping, clearly different from design, or printing defect.</p>
                    </div>
                </div>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary">How can we <span className="text-text-secondary">help?</span></h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                        Find answers to common questions or reach out to our team directly.
                    </p>
                </motion.div>

                {/* FAQ Section */}
                <section>
                    <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-3 border-b border-border pb-2">
                        Frequently Asked Questions
                    </h2>
                    <Accordion items={faqData} />
                </section>

                {/* Policies Section */}
                <section>
                    <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-3 border-b border-border pb-2">
                        Policies & Shipping
                    </h2>
                    <Accordion items={policyData} />
                </section>

                {/* Contact Support */}
                <section className="bg-surface border border-border p-8 md:p-12">
                    <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">Contact Support</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white border border-border flex items-center justify-center mx-auto text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-primary">Call Us</h3>
                            <p className="text-text-secondary">+91 99999 99999</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white border border-border flex items-center justify-center mx-auto text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-primary">Email Us</h3>
                            <p className="text-text-secondary">support@PROMETHIX3D3d.com</p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-white border border-border flex items-center justify-center mx-auto text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-primary">Visit Us</h3>
                            <p className="text-text-secondary">Mumbai, India</p>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <Button className="bg-primary hover:bg-slate-800 text-white px-8 h-12 rounded-none uppercase tracking-widest font-bold">
                            Chat on WhatsApp
                        </Button>
                    </div>
                </section>

            </div>
        </div>
    );
}
