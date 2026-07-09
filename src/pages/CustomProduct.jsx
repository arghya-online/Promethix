import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  CheckCircle,
  Truck,
  ShieldCheck,
  User,
  Phone,
  FileText
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const MATERIALS_SPECS = {
  "PLA+": { label: "PLA+ (Matte)", desc: "Sturdy, bio-friendly. Best for general desktop models, organizers, and gadgets." },
  "Silk PLA": { label: "Silk PLA (Glossy)", desc: "Glossy, metallic-like sheen. Ideal for ornamental cases, figurines, and decor." },
  "PETG": { label: "PETG (Industrial)", desc: "Strong impact & weather resistance. Great for functional prototyping and brackets." },
  "Resin": { label: "Resin (Ultra Detail)", desc: "Extreme layer resolution (0.02mm). Best for high-detail tabletop miniatures." }
};

const COLORS = [
  { name: "Cyber Black", hex: "#09090b" },
  { name: "Frost White", hex: "#f4f4f5" },
  { name: "Gold Dust", hex: "#d97706" },
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Laser Teal", hex: "#06b6d4" }
];

export default function CustomProduct() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  
  const { user: currentUser, userData, token } = useAuth();

  // Contact States
  const [customerName, setCustomerName] = useState(userData?.fullName || currentUser?.displayName || "");
  const [customerPhone, setCustomerPhone] = useState(userData?.phone || "");
  const [projectDescription, setProjectDescription] = useState("");

  // Configurator States
  const [size, setSize] = useState(15); 
  const [material, setMaterial] = useState("PLA+");
  const [color, setColor] = useState("Gold Dust");
  const [loading, setLoading] = useState(false);

  // Sync user display name if they log in later
  useEffect(() => {
    if (userData) {
      setCustomerName(userData.fullName || "");
      setCustomerPhone(userData.phone || "");
    } else if (currentUser?.displayName) {
      setCustomerName(currentUser.displayName);
    }
  }, [userData, currentUser]);

  const openWhatsApp = async () => {
    if (!customerName.trim()) {
      alert("Please enter your name to start the consultation.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        isCustom: true,
        customSpecs: {
          size,
          material,
          color,
          fileName: "consultation-requirements"
        },
        totalAmount: 0, // No price estimation
        deliveryAddress: {
          addressLine: `Name: ${customerName} | Phone: ${customerPhone} | Requirements: ${projectDescription}`
        }
      };

      console.log("CustomProduct: Logging custom consultation request to localStorage...");
      const orderNumber = `PMX-CUST-${Date.now().toString().slice(-4)}`;
      const newOrder = {
        id: `order_${Date.now()}`,
        orderNumber,
        isCustom: true,
        customSpecs: orderPayload.customSpecs,
        totalAmount: 0,
        deliveryAddress: orderPayload.deliveryAddress,
        createdAt: new Date().toISOString(),
        status: "pending",
        user: currentUser ? {
          name: customerName || currentUser.displayName || userData?.fullName || "Guest Customer",
          email: currentUser.email
        } : {
          name: customerName || "Guest Customer",
          email: "guest@promethix3d.com"
        }
      };

      const storedOrders = localStorage.getItem("promethix_orders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(newOrder);
      localStorage.setItem("promethix_orders", JSON.stringify(orders));

      const whatsappNumber = "919832769269"; 
      let shareMessage = `Hi PROMETHIX3D! I'd like to request a custom 3D printing consultation (Ref: ${orderNumber}).\n\n`;
      shareMessage += `Name: ${customerName}\n`;
      if (customerPhone) shareMessage += `WhatsApp Contact: ${customerPhone}\n`;
      if (projectDescription) shareMessage += `Project Brief: ${projectDescription}\n\n`;
      shareMessage += `Configured Specs:\n`;
      shareMessage += `- Material: ${material}\n`;
      shareMessage += `- Color: ${color}\n`;
      shareMessage += `- Size: ${size} cm`;

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(shareMessage)}`, "_blank");
    } catch (err) {
      console.error("Consultation submission failed:", err);
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        });
      }

      if (timelineRef.current) {
        const steps = timelineRef.current.querySelectorAll(".process-step");
        gsap.from(steps, {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    { num: "01", title: "Fill Specifications", desc: "Define your preferred size, polymer material type, and visual color." },
    { num: "02", title: "Describe Idea", desc: "Briefly explain what you need fabricated in the description text fields." },
    { num: "03", title: "Send to WhatsApp", desc: "Submit the form to send direct design consultations instantly." },
    { num: "04", title: "Fabrication Review", desc: "Our staff checks tolerance bounds before starting print operations." },
  ];

  const faqs = [
    {
      title: "How is custom pricing estimated?",
      content: "Once you submit your specifications, our staff slices the model to determine exact polymer weight and print duration, providing an accurate quote on WhatsApp."
    },
    {
      title: "What file formats do you accept?",
      content: "We accept STL, OBJ, STEP, and solid model ZIP files. You can send these files directly to us during the WhatsApp chat."
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#ffffff] pb-20 pt-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title Block */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-2xl md:text-4xl font-black text-zinc-950 mb-3 uppercase tracking-tight">
            Custom Consultation Configurator
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 max-w-xl mx-auto font-medium">
            Configure your project preferences, enter your details, and submit directly to WhatsApp for a custom quote.
          </p>
        </div>

        {/* Console Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-xl p-5 md:p-6 flex flex-col gap-6 shadow-sm">
            
            {/* Step 1: Contact Details */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-3.5">
                1. Customer Details
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 placeholder-slate-400 focus:bg-white transition-all outline-none"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="WhatsApp Number (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 placeholder-slate-400 focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  placeholder="Describe your project (e.g. customized dimensions, model utility, file download link, infill requirements) *"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="w-full h-24 pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 placeholder-slate-400 focus:bg-white transition-all outline-none resize-none"
                />
              </div>
            </div>

            {/* Step 2: Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                  2. Preferred Height / Width Size
                </label>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">{size} cm</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg flex items-center border border-slate-100">
                <input
                  type="range"
                  min="10"
                  max="30"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Step 3: Material Grid */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">
                3. Choose Polymer Material
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                {Object.keys(MATERIALS_SPECS).map((matKey) => {
                  const isSelected = material === matKey;
                  return (
                    <button
                      key={matKey}
                      onClick={() => setMaterial(matKey)}
                      className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer outline-none ${
                        isSelected
                          ? "bg-amber-500/5 border-amber-600 shadow-sm"
                          : "bg-white border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`block text-xs font-bold ${isSelected ? "text-amber-800" : "text-slate-800"}`}>
                        {matKey}
                      </span>
                      <span className="text-[9px] text-slate-400 mt-1 block leading-tight">
                        {MATERIALS_SPECS[matKey].label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Swatches */}
            <div>
              <label className="block text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">
                4. Select Color Sheen
              </label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => {
                  const isSelected = color === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 border-slate-900 text-white font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                      <span className="text-[9px] tracking-wider uppercase">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Cost Box */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Consultation Summary */}
            <div className="bg-white border border-slate-100 rounded-xl p-5 md:p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50 pb-2">
                Consultation Overview
              </h3>

              <div className="space-y-3 font-mono text-[10px] text-slate-500">
                <div className="flex justify-between">
                  <span>TARGET SIZE</span>
                  <span className="font-bold text-slate-800">{size} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>MATERIAL TYPE</span>
                  <span className="font-bold text-slate-800">{material}</span>
                </div>
                <div className="flex justify-between">
                  <span>SELECTED COLOR</span>
                  <span className="font-bold text-slate-800">{color}</span>
                </div>
                <div className="border-t border-dashed border-slate-200 pt-3 text-slate-400 leading-normal">
                  <span className="font-sans block text-[9px] font-semibold">
                    Submit to send configured options straight to our design team via WhatsApp for instant manual file slice reviews.
                  </span>
                </div>
              </div>

              {/* Order action button */}
              <div className="mt-2">
                <Button
                  onClick={openWhatsApp}
                  disabled={loading}
                  className="h-11 px-6 w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest text-[10px] rounded-full shadow-sm flex items-center justify-center gap-2 border-0 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Preparing Consultation..." : <>Get WhatsApp Consultation <MessageCircle className="w-4 h-4" /></>}
                </Button>
              </div>
            </div>

            {/* Quick specifications */}
            <div className="border border-slate-100 rounded-lg p-4 flex items-center justify-around text-center py-4 bg-white shadow-sm text-[9px] uppercase tracking-wider text-slate-400 font-bold">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-zinc-650" /> 0.1mm accuracy</span>
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-zinc-650" /> Tracked shipping</span>
            </div>

          </div>

        </div>

        {/* Process timelines */}
        <div ref={timelineRef} className="max-w-4xl mx-auto border-t border-slate-100 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-zinc-950 mb-2">Process Stages</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step bg-white border border-slate-100 p-4 rounded-lg shadow-sm text-left">
                <span className="text-[8px] font-black text-amber-600 tracking-wider block mb-1.5">{step.num} / STEP</span>
                <h3 className="text-xs font-bold text-slate-800 mb-1">{step.title}</h3>
                <p className="text-[10px] text-slate-450 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-2xl mx-auto border-t border-slate-100 pt-12">
          <div className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm">
            <Accordion items={faqs} className="text-slate-700" />
          </div>
        </div>

      </div>
    </section>
  );
}
