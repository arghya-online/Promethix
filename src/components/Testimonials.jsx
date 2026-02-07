
import React from "react";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
    const reviews = [
        {
            id: 1,
            name: "Rohan D.",
            role: "Engineering Student",
            text: "The precision on my final year project prototype was insane. Every gear fit perfectly without any post-processing. Highly recommended!",
            rating: 5,
        },
        {
            id: 2,
            name: "Priya S.",
            role: "Cosplayer",
            text: "Ordered a custom prop and the details were spot on. The print quality is smooth and ready to paint. Will definitely order again.",
            rating: 5,
        },
        {
            id: 3,
            name: "Amit K.",
            role: "Product Designer",
            text: "Fast turnaround and great communication. They helped me optimize my STL file for better strength. A true engineering partner.",
            rating: 5,
        },
    ];

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                        Trusted by Creators
                    </h2>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        From students to professionals, hear what our community is building.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
                        >
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-200 group-hover:text-amber-100 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-700 leading-relaxed mb-8 relative z-10">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                                        {review.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
