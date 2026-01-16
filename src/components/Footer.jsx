import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/PromethixLogo.png";
import {
    Facebook,
    Instagram,
    Twitter,
    CreditCard,
    Banknote,
    Wallet,
    MapPin,
    Phone,
    Mail,
    ArrowRight
} from "lucide-react";

export function Footer() {
    return (
        <footer className="relative bg-slate-950 text-slate-300 pt-24 pb-12 overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                    {/* Brand & Description (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={Logo} alt="PROMETHIX3D" className="h-10 w-auto filter invert brightness-200" />
                            <span className="text-2xl font-black font-heading tracking-tighter text-white">
                                PROMETHIX3D
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-7 max-w-sm">
                            Pioneering the future of manufacturing with industrial-grade 3D printing.
                            From rapid prototyping to end-use production, we turn digital concepts into physical reality.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
                            <SocialLink icon={<Facebook className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links (2 cols) */}
                    <div className="lg:col-span-2">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-8 text-xs">Explore</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/products" className="hover:text-amber-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> All Products</Link></li>
                            <li><Link to="/custom" className="hover:text-amber-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Custom Orders</Link></li>
                            <li><Link to="/about" className="hover:text-amber-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> About Us</Link></li>
                            <li><Link to="/support" className="hover:text-amber-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Support Center</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-8 text-xs">Contact Us</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-500">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Headquarters</span>
                                    <span className="text-slate-500 block">IEM Management House, Salt Lake Sec V</span>
                                    <span className="text-slate-500">Kolkata, WB 700091</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-500">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Phone</span>
                                    <a href="tel:+919876543210" className="text-slate-500 hover:text-white transition-colors">+91 98765 43210</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-amber-500">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-white font-medium mb-1">Email</span>
                                    <a href="mailto:hello@PROMETHIX3D3d.com" className="text-slate-500 hover:text-white transition-colors">hello@PROMETHIX3D3d.com</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Map (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="font-bold text-white uppercase tracking-wider mb-8 text-xs">Location</h4>
                        <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
                            {/* Overlay for interaction hint */}
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />

                            <iframe
                                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=IEM%20Management%20House,D%20-1,%20Street%20No.%2013,%20EP%20Block,%20Sector%20V,%20Bidhannagar,%20Kolkata,%20West%20Bengal%20700091&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(80%)" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="PROMETHIX3D Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-500">
                        © 2026 PROMETHIX3D. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <PaymentIcon icon={<CreditCard />} />
                        <PaymentIcon icon={<Wallet />} />
                        <PaymentIcon icon={<Banknote />} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon, href }) {
    return (
        <a href={href} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all hover:scale-110">
            {icon}
        </a>
    );
}

function PaymentIcon({ icon }) {
    return (
        <div className="p-2 border border-slate-800 bg-slate-900 rounded text-slate-500">
            {icon}
        </div>
    );
}
