import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/PromethixLogo.png";
import {
    Facebook,
    Instagram,
    Twitter,
    CreditCard,
    Banknote,
    Wallet
} from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 text-slate-800 pt-20 pb-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={Logo} alt="Promethix" className="h-10 w-auto" />
                            <span className="text-2xl font-black font-heading tracking-tighter text-black">
                                PROMETHIX
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Industrial-grade 3D printing services for everyone. From prototype to final product, we deliver precision.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink icon={<Instagram className="w-5 h-5" />} />
                            <SocialLink icon={<Twitter className="w-5 h-5" />} />
                            <SocialLink icon={<Facebook className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-black uppercase tracking-wider mb-6 text-sm">Shop</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link to="/products" className="hover:text-amber-600 transition-colors">All Products</Link></li>
                            <li><Link to="/custom" className="hover:text-amber-600 transition-colors">Custom Orders</Link></li>
                            <li><Link to="/products" className="hover:text-amber-600 transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-black uppercase tracking-wider mb-6 text-sm">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><Link to="/support" className="hover:text-amber-600 transition-colors">Help Center</Link></li>
                            <li><Link to="/support" className="hover:text-amber-600 transition-colors">Shipping & Returns</Link></li>
                            <li><Link to="/about" className="hover:text-amber-600 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact / Payments */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-black uppercase tracking-wider mb-6 text-sm">We Accept</h4>
                        <div className="flex flex-wrap gap-4 text-slate-400 mb-8">
                            <PaymentIcon icon={<CreditCard />} />
                            <PaymentIcon icon={<Wallet />} />
                            <PaymentIcon icon={<Banknote />} />
                        </div>
                        <p className="text-xs text-slate-400">
                            © 2025 Promethix3D. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon }) {
    return (
        <Link to="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-all">
            {icon}
        </Link>
    );
}

function PaymentIcon({ icon }) {
    return (
        <div className="p-2 border border-slate-200 rounded text-slate-500">
            {icon}
        </div>
    );
}
