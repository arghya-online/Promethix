import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/PromethixLogo.png";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background text-text-primary">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Contact Info */}
                    <div className="col-span-1">
                        <img src={Logo} alt="Promethix Logo" className="w-32 mb-4" />
                        <p className="text-text-muted text-sm">
                            123 Main Street, Anytown, USA
                            <br />
                            Phone: (123) 456-7890
                            <br />
                            Email: info@promethix.com
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/support">Contact Support</Link></li>
                            <li><Link to="/support">Shipping Policy</Link></li>
                            <li><Link to="/support">Returns & Refunds</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <Link to="#" className="text-text-muted hover:text-text-primary">
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link to="#" className="text-text-muted hover:text-text-primary">
                                <Instagram className="w-6 h-6" />
                            </Link>
                            <Link to="#" className="text-text-muted hover:text-text-primary">
                                <Twitter className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-1">
                        <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                        <p className="text-text-muted mb-4">
                            Subscribe to our newsletter to get the latest updates and offers.
                        </p>
                        <form className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 border border-border bg-white text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none" />
                            <button type="submit" className="px-6 py-2 bg-primary text-white hover:bg-slate-800 transition-colors rounded-none uppercase font-bold text-sm tracking-wide">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
