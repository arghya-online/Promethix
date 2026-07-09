import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { ENRICHED_PRODUCTS } from "../data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Wishlist() {
    const { wishlist, user } = useAuth();
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        if (wishlist && wishlist.length > 0) {
            const filtered = ENRICHED_PRODUCTS.filter((product) =>
                wishlist.includes(product.id)
            );
            setWishlistProducts(filtered);
        } else {
            setWishlistProducts([]);
        }
    }, [wishlist]);

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 pt-24">
                <Heart className="w-16 h-16 text-slate-300" />
                <h2 className="text-2xl font-bold text-slate-900">Your Wishlist is waiting</h2>
                <p className="text-slate-500">Sign in to save items for later.</p>
                <Link to="/">
                    <Button>Go Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">My Wishlist</h1>

                {wishlistProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 space-y-4 border rounded-lg bg-slate-50">
                        <Heart className="w-12 h-12 text-slate-300" />
                        <p className="text-slate-500 text-lg">Your wishlist is empty.</p>
                        <Link to="/products">
                            <Button variant="outline">Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlistProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
