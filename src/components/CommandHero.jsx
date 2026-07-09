import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, Upload, Box } from "lucide-react";
import HeroBg from "../assets/HeroImages/hero-bg-engineering-minimal.png"; // Fallback or use a new one

export const CommandHero = () => {
    const ref = useRef(null);

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = clientX / innerWidth - 0.5;
        const y = clientY / innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[85vh] bg-slate-950 overflow-hidden flex items-center justify-center perspective-1000"
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Command Interface */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono tracking-widest uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        System Online v2.4
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                        PRECISION <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">ENGINEERED</span> <br />
                        ARTIFACTS.
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
                        Deploy battleship-grade 3D prints to your desk. From rapid prototyping to end-use parts, we execute with zero tolerance for failure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/products" className="group">
                            <Button className="h-14 px-8 bg-amber-500 hover:bg-amber-400 text-black font-bold text-lg tracking-wide rounded-none skew-x-[-10deg] transition-all group-hover:skew-x-0">
                                <span className="skew-x-[10deg] group-hover:skew-x-0 flex items-center gap-2">
                                    INITIATE ORDER <ArrowRight className="w-5 h-5" />
                                </span>
                            </Button>
                        </Link>

                        <Link to="/custom" className="group">
                            <Button variant="outline" className="h-14 px-8 border-slate-700 hover:bg-slate-800 text-white font-bold text-lg tracking-wide rounded-none skew-x-[-10deg] transition-all group-hover:skew-x-0">
                                <span className="skew-x-[10deg] group-hover:skew-x-0 flex items-center gap-2">
                                    UPLOAD FILES <Upload className="w-5 h-5" />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Right: 3D Object Preview (Parallax) */}
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative hidden lg:flex items-center justify-center"
                >
                    {/* Placeholder for 3D Object - using a CSS Cube or Image */}
                    <div className="relative w-96 h-96 bg-gradient-to-tr from-amber-500/20 to-slate-900/20 backdrop-blur-sm border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-900/20">
                        <img
                            src="https://images.unsplash.com/photo-1615469062331-5079f8ee476c?q=80&w=1000&auto=format&fit=crop"
                            alt="3D Print"
                            className="w-full h-full object-cover rounded-3xl opacity-80 mix-blend-overlay absolute inset-0"
                        />
                        <Box className="w-32 h-32 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] z-20" strokeWidth={0.5} />

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-slate-900/90 border border-slate-700 p-4 rounded-xl backdrop-blur-md z-30 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-mono text-green-400">PRINT_READY</span>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-5 -left-5 bg-slate-900/90 border border-slate-700 p-3 rounded-xl backdrop-blur-md z-30 shadow-xl"
                        >
                            <div className="text-xs font-mono text-slate-400">
                                <div>INFILL: 100%</div>
                                <div>MAT: PLA+</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};
