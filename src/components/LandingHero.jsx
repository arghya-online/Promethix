import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Box, Sparkles } from "lucide-react";
import { ENRICHED_PRODUCTS as PRODUCTS } from "@/data/products";
import ImgMain from "../assets/HeroImages/mainImage.png";
import ImgSub1 from "../assets/HeroImages/subImage1.png";
import ImgSub2 from "../assets/HeroImages/subImage2.png";

export function LandingHero() {
  // Select specific images for the collage
  const heroImage = ImgMain;
  const subImage1 = ImgSub1;
  const subImage2 = ImgSub2;

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const sub1Ref = useRef(null);
  const sub2Ref = useRef(null);

  useGSAP(() => {
    const heroX = gsap.quickTo(heroRef.current, "x", { duration: 0.5, ease: "power3" });
    const heroY = gsap.quickTo(heroRef.current, "y", { duration: 0.5, ease: "power3" });

    const sub1X = gsap.quickTo(sub1Ref.current, "x", { duration: 0.4, ease: "power3" });
    const sub1Y = gsap.quickTo(sub1Ref.current, "y", { duration: 0.4, ease: "power3" });

    const sub2X = gsap.quickTo(sub2Ref.current, "x", { duration: 0.6, ease: "power3" });
    const sub2Y = gsap.quickTo(sub2Ref.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5);
      const y = (clientY / innerHeight - 0.5);

      heroX(x * 30);
      heroY(y * 30);

      sub1X(x * -40); // Inverse movement for depth
      sub1Y(y * -40);

      sub2X(x * 60);
      sub2Y(y * 60);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 pt-16 pb-20 lg:pt-32 lg:pb-32 min-h-[90vh] flex items-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vh] bg-amber-200/40 rounded-full blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* LEFT: Content */}
          <div className="flex flex-col items-start text-left max-w-xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
                Bring Ideas <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Into Reality.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-6 font-medium space-y-4"
            >
              <p> We’re PROMETHIX3D, a 3D design and 3D printing startup based in India.</p>

              <p>We make everything from decor, figurines, idols, gifts, and lithophanes to mechanical parts for projects.</p>
              <p>You can order ready-made models from our shop, or send us your custom idea — even without a 3D file.</p>

              <p>Just share your requirement. We’ll design it, print it cleanly, and deliver it safely to your location.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur rounded-full border border-slate-200 mb-10 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm text-slate-500 font-semibold">
                No 3D file? No problem. We’ll design it for you.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto"
            >
              <Link to="/products">
                <Button className="h-14 px-10 bg-slate-900 text-white hover:bg-black rounded-full text-sm font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl hover:shadow-slate-900/20 transition-all hover:-translate-y-1 w-full sm:w-auto">
                  Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="outline" className="h-14 px-10 border-slate-300 text-slate-700 hover:border-slate-900 hover:bg-white/50 backdrop-blur rounded-full text-sm font-bold tracking-widest uppercase transition-all w-full sm:w-auto">
                  Start Custom Order
                </Button>
              </Link>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-8 border-t border-slate-200/60 w-full"
            >
              {[
                { icon: <Box className="w-4 h-4" />, text: "Safe Packaging" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Quality Checked" },
                { icon: <Sparkles className="w-4 h-4" />, text: "Premium Materials" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wide">
                  <div className="text-amber-600">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual Collage (Redesigned) */}
          <div className="relative h-[500px] lg:h-[700px] hidden lg:block perspective-1000">

            {/* Main Hero Image - Large & Dominant */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-20 border-[6px] border-white"
            >
              <img src={heroImage} className="w-full h-full object-cover" alt="Hero 3D Print" />
            </motion.div>

            {/* Floating Card 1 - Top Right - Glassmorphic */}
            <motion.div
              ref={sub1Ref}
              initial={{ opacity: 0, x: 50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="absolute top-[10%] right-[5%] w-[35%] aspect-square rounded-[2rem] shadow-2xl overflow-hidden z-30 border-4 border-white/50 bg-white/20 backdrop-blur-sm"
            >
              <img src={subImage1} className="w-full h-full object-cover" alt="Detail Print" />
            </motion.div>

            {/* Floating Card 2 - Bottom Left - Accent */}
            <motion.div
              ref={sub2Ref}
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, type: "spring" }}
              className="absolute bottom-[10%] left-[-5%] w-[30%] aspect-[4/5] rounded-[2rem] shadow-2xl overflow-hidden z-30 border-4 border-white"
            >
              <img src={subImage2} className="w-full h-full object-cover" alt="Background Element" />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-[40px] z-10"
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-10 w-40 h-40 bg-orange-500/10 rounded-full blur-[50px] z-10"
            />

          </div>
        </div>
      </div>
    </section>
  );
}
