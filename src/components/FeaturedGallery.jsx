
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Gallery1 from "../assets/gallery/gallery-1.png";
import Gallery2 from "../assets/gallery/gallery-2.png";
import Gallery3 from "../assets/gallery/gallery-3.png";
// Placeholder imports - ensure these images exist or use placeholders

export function FeaturedGallery() {
    const projects = [
        {
            id: 1,
            title: "Mechanical Prototype",
            category: "Engineering",
            image: Gallery1,
            size: "large" // Spans 2 rows
        },
        {
            id: 2,
            title: "Custom Lithophane",
            category: "Decor",
            image: Gallery2,
            size: "small"
        },
        {
            id: 3,
            title: "Gaming Setup",
            category: "Accessories",
            image: Gallery3,
            size: "medium" // Spans 2 cols
        },
        {
            id: 4,
            title: "Cosplay Prop",
            category: "Costume",
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop", // Unsplash placeholder for variety
            size: "small"
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
                            Featured Projects
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Real prints. Real precision. <br /> A showcase of our recent custom commissions.
                        </p>
                        <div className="h-1 w-24 bg-amber-500 mt-4" />
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                            Quality you can feel
                        </p>
                    </div>
                </div>

                {/* MASONRY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className={`relative group overflow-hidden rounded-2xl bg-slate-200 ${project.size === "large" ? "md:row-span-2" :
                                    project.size === "medium" ? "md:col-span-2" : ""
                                }`}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    {project.category}
                                </span>
                                <h3 className="text-white text-2xl font-bold flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {project.title}
                                    <ArrowUpRight className="w-5 h-5 text-amber-400" />
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
