import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Shield, Star, Info, Package, Ruler, Timer, Weight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = PRODUCTS.find((p) => p.id === parseInt(id));
    const [activeImage, setActiveImage] = useState(0);

    if (!product) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-text-muted bg-background">
                Product not found
            </div>
        );
    }

    // Mock Reviews based on rating count
    const mockReviews = Array.from({ length: 3 }).map((_, i) => ({
        user: ["Alex M.", "Sarah K.", "David R."][i],
        rating: 5,
        comment: ["Absolutely stunning detail!", "Exceeded my expectations entirely.", "Fast shipping and great quality."][i],
        date: "2 days ago"
    }));

    return (
        <div className="min-h-screen bg-background text-text-primary pb-20">
            {/* Breadcrumb / Top Nav */}
            <div className="border-b border-border bg-surface-light/50">
                <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-text-secondary">
                    <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
                    <span className="mx-2">/</span>
                    <span className="text-primary font-medium">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* LEFT: Image Gallery */}
                    <div className="space-y-6 sticky top-24 self-start">
                        <motion.div
                            layoutId={`product-image-${product.id}`}
                            className="aspect-square bg-surface-light border border-border overflow-hidden relative group"
                        >
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`aspect-square bg-surface-light border ${activeImage === i ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/50"} cursor-pointer overflow-hidden transition-all`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Badge variant="outline" className="text-primary border-primary/20 bg-blue-50/50 rounded-none uppercase tracking-widest text-[10px] font-bold px-3 py-1">
                                    {product.category}
                                </Badge>
                                {product.rating && (
                                    <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                                        <Star className="w-4 h-4 fill-yellow-500" />
                                        <span>{product.rating}</span>
                                        <span className="text-text-muted font-normal ml-1">({product.reviews} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight mb-4 leading-[1.1]">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-light text-slate-900">₹{product.price}</p>
                        </div>

                        <div className="prose prose-slate text-text-secondary leading-relaxed">
                            <p className="text-lg">{product.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                            <Button
                                size="lg"
                                className="flex-1 bg-primary hover:bg-slate-800 text-white shadow-xl shadow-primary/20 h-14 text-lg rounded-none uppercase tracking-widest font-bold"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="flex-1 border-border text-primary hover:bg-surface-light h-14 text-lg bg-transparent rounded-none uppercase tracking-widest font-bold"
                                onClick={() => window.location.href = '/custom'}
                            >
                                Custom Request
                            </Button>
                        </div>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            {product.features?.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-surface border border-border/50">
                                    <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                                </div>
                            )) || (
                                    <>
                                        <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-primary" /> <span className="text-sm font-medium">Fast Shipping</span></div>
                                        <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-primary" /> <span className="text-sm font-medium">Quality Check</span></div>
                                    </>
                                )}
                        </div>

                        {/* Specifications Accordion/Table */}
                        <div className="pt-8">
                            <h3 className="font-heading font-bold text-xl text-primary mb-6 border-b border-border pb-2">Technical Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider font-bold">
                                        <Package className="w-4 h-4" /> Material
                                    </div>
                                    <p className="font-medium text-slate-900">{product.specs?.material || "PLA+"}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider font-bold">
                                        <Ruler className="w-4 h-4" /> Dimensions
                                    </div>
                                    <p className="font-medium text-slate-900">{product.specs?.dimensions || "Variable"}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider font-bold">
                                        <Weight className="w-4 h-4" /> Weight
                                    </div>
                                    <p className="font-medium text-slate-900">{product.specs?.weight || "Lightweight"}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider font-bold">
                                        <Timer className="w-4 h-4" /> Print Time
                                    </div>
                                    <p className="font-medium text-slate-900">{product.specs?.printTime || "4-6 Hours"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long Description & Reviews Section */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-border pt-16">
                    <div className="lg:col-span-2 space-y-8">
                        <h3 className="font-heading font-bold text-2xl text-primary">Description</h3>
                        <div className="prose prose-lg prose-slate text-text-secondary max-w-none">
                            <p>{product.longDescription || product.description}</p>
                            <p>
                                At Promethix3D, we ensure every layer counts. This product is subjected to rigorous post-processing including
                                sanding, priming, and quality inspection to ensure it meets our high standards. Ideal for collectors, engineers,
                                and design enthusiasts alike.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h3 className="font-heading font-bold text-2xl text-primary">Customer Reviews</h3>
                        <div className="space-y-6">
                            {mockReviews.map((review, i) => (
                                <div key={i} className="border-b border-border pb-6 last:border-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-slate-900">{review.user}</span>
                                        <span className="text-xs text-text-muted">{review.date}</span>
                                    </div>
                                    <div className="flex text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <p className="text-sm text-text-secondary italic">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
