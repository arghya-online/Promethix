import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Support() {
    const faqData = [
        { title: "What materials do you print with?", content: "We primarily use PLA+ (biodegradable, high detail) and PETG (durable, heat resistant). We also offer TPU for flexible parts upon request." },
        { title: "How long does shipping take?", content: "Orders are typically processed and printed within 3-5 business days. Shipping usually takes an additional 2-4 days depending on your location in India." },
        { title: "Can I request a custom 3D model?", content: "Absolutely! Use our 'Custom Project' page to send us details. If you have an STL file, great! If not, we can help design it for you." },
    ];

    const policyData = [
        { title: "Shipping Policy", content: "We ship across India. All items are securely packed to prevent damage. Shipping is calculated at checkout based on weight and location. We offer free shipping on orders over ₹2000." },
        { title: "Returns & Refunds", content: "Due to the custom nature of 3D printing, we do not accept returns for change of mind. However, if your item arrives damaged or defective, please contact us within 24 hours with photos for a replacement or refund." },
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
                            <p className="text-text-secondary">support@promethix3d.com</p>
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
