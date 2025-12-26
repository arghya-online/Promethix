import React from "react";
import { useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Shield } from "lucide-react";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = PRODUCTS.find((p) => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-text-muted bg-background">
                Product not found
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-surface-light rounded-2xl overflow-hidden border border-border">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, i) => (
                                <div key={i} className="aspect-square bg-surface-light rounded-lg overflow-hidden border border-border cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                    <img src={img} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-primary/10">
                                {product.category}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight mb-2">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-light text-primary">₹{product.price}</p>
                        </div>

                        <div className="prose prose-invert text-text-secondary">
                            <p>{product.description}</p>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li>Precision 3D printed with eco-friendly PLA+ or durable PETG.</li>
                                <li>Custom colors available upon request.</li>
                                <li>Designed for modern aesthetics and durability.</li>
                            </ul>
                        </div>

                        <div className="flex gap-4 pt-8 border-t border-border">
                            <Button size="lg" className="flex-1 bg-primary hover:bg-blue-600 text-white shadow-lg shadow-primary/20 h-14 text-lg" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="outline" className="flex-1 border-border text-white hover:bg-surface-light h-14 text-lg bg-surface">
                                Custom Request
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm text-text-muted pt-8">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <Truck className="w-6 h-6 text-primary" />
                                <span>Fast Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <Shield className="w-6 h-6 text-primary" />
                                <span>Quality Check</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <Check className="w-6 h-6 text-primary" />
                                <span>Made to Order</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
