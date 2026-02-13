import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck,
  Share2, Heart, ChevronDown, Check, ArrowRight, Box, Ruler
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";
import { useAuth } from "../context/auth-context";
import { ENRICHED_PRODUCTS as PRODUCTS } from "@/data/products";
import { ProductReviews } from "@/components/ProductReviews";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAdded, setIsAdded] = useState(false); // Track if item is added
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useAuth();
  const isWishlisted = product && wishlist ? wishlist.includes(product.id) : false;

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    const found = PRODUCTS.find((p) => p.id == id); // Use == to match string/number
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
    } else {
      toast.error("Product not found");
      // navigate("/products");
    }
  }, [id]);


  const [realReviewCount, setRealReviewCount] = useState(0);

  useEffect(() => {
    if (!product) return;
    const q = query(
      collection(db, "reviews"),
      where("productId", "==", product.id)
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setRealReviewCount(snap.size);
    });
    return () => unsubscribe();
  }, [product]);

  if (!product) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  // ... (AddToCart logic remains) ...

  const handleAddToCart = () => {
    if (isAdded) {
      navigate("/cart");
      return;
    }
    addToCart(product, quantity);
    toast.success(`Added ${quantity} x ${product.name} to cart`);
    setIsAdded(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  }

  // const discountedPrice = product.discountPercent
  //   ? Math.round(product.price * (1 - product.discountPercent / 100))
  //   : product.price;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-32 md:pb-20">

      {/* HEADER SPACER */}
      <div className="h-20 md:h-24" />

      {/* BREADCRUMB (Simple) */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 text-sm text-slate-500">
        <Link to="/products" className="hover:text-amber-600 transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium truncate">{product.name}</span>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12">

          {/* --- LEFT COLUMN: GALLERY --- */}
          <div className="flex flex-col gap-4">
            {/* ... Gallery code ... */}
            {/* Main Image */}
            <div className="relative group w-full aspect-square md:aspect-[4/5] lg:aspect-square max-h-[520px] bg-slate-50 rounded-none overflow-hidden border border-slate-100">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
              />
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2.5 bg-white/90 backdrop-blur rounded-none shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-red-500"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out this ${product.name}`,
                        url: url,
                      }).catch((error) => console.log('Error sharing', error));
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied to clipboard");
                    }
                  }}
                  className="p-2.5 bg-white/90 backdrop-blur rounded-none shadow-sm hover:shadow-md transition-all text-slate-600 hover:text-blue-500"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-none overflow-hidden border-2 transition-all ${activeImage === img ? 'border-amber-500 ring-1 ring-amber-500/20' : 'border-slate-100 hover:border-slate-300'
                    }`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: DETAILS --- */}
          <div>

            {/* A) Category */}
            <Badge variant="outline" className="mb-4 text-xs font-semibold px-3 py-1 bg-slate-50 text-slate-600 border-slate-200">
              {product.category}
            </Badge>

            {/* B) Title */}
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-[1.1] mb-3">
              {product.name}
            </h1>

            {/* C) Rating */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-400">({realReviewCount} reviews)</span>
            </div>

            {/* D) Price */}
            <div className="flex items-baseline gap-3 mb-6 border-b border-slate-100 pb-6">
              <span className="text-3xl font-black text-slate-900">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-slate-400 line-through decoration-slate-300">₹{product.originalPrice}</span>
                  <span className="text-red-600 font-bold text-sm bg-red-50 px-2 py-0.5 rounded">-{product.discountPercent}%</span>
                </>
              )}
            </div>

            {/* E) Short Description */}
            <p className="text-slate-600 leading-relaxed mb-8 text-[15px]">
              {product.description}
            </p>

            {/* F) Details & Specs */}
            <div className="space-y-6 mb-10">

              {/* 1. Bullet Points (Benefits) */}
              {product.details && product.details.length > 0 && (
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-medium text-slate-700 leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* 2. Technical Specs (Compact Grid) */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                {product.specs?.material && (
                  <div className="bg-slate-50 rounded-none p-2.5 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Material</span>
                    <span className="text-xs font-bold text-slate-900 leading-tight">{product.specs.material}</span>
                  </div>
                )}
                {product.specs?.dimensions && (
                  <div className="bg-slate-50 rounded-none p-2.5 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">Dimensions</span>
                    <span className="text-xs font-bold text-slate-900 leading-tight">{product.specs.dimensions}</span>
                  </div>
                )}

              </div>
            </div>

            {/* G) CTA Section (Desktop) */}
            <div className="hidden md:block space-y-4">
              <div className="flex items-center gap-4">
                {/* Qty */}
                <div className="flex items-center border border-slate-200 rounded-none h-[52px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-slate-900 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 h-[52px] text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-white ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}`}
                >
                  {isAdded ? "Go to Order Cart" : `Add to Cart - ₹${(product.price * quantity).toLocaleString()}`}
                  {isAdded && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleBuyNow}
                className="w-full h-12 font-semibold border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-600"
              >
                Buy Now
              </Button>
            </div>

            {/* H) Trust Line */}
            <div className="flex items-center gap-4 mt-8 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> Safe Packaging</span>
              <span className="w-1 h-1 rounded-none bg-slate-300" />
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" /> Quality Checked</span>
              <span className="w-1 h-1 rounded-none bg-slate-300" />
              <span>WhatsApp Support</span>
            </div>

          </div>
        </div>

        {/* --- TABS SECTION (Extra Info) --- */}
        <div className="mt-20 md:mt-28 border-t border-slate-100 pt-16">

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-8 border-b border-slate-200 mb-8">
            {['description', 'specs', 'shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold uppercase tracking-wide transition-all ${activeTab === tab
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-400 hover:text-slate-600 border-b-2 border-transparent'
                  }`}
              >
                {tab === 'description' ? 'Product Description' : tab === 'specs' ? 'Specifications' : 'Shipping & Returns'}
              </button>
            ))}
          </div>

          {/* Tab Content (Desktop) */}
          <div className="hidden md:block min-h-[200px] text-slate-600 leading-relaxed max-w-3xl">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <p className="mb-4">
                    Experience the perfect blend of artistry and precision with the <span className="font-semibold text-slate-900">{product.name}</span>.
                    Meticulously 3D printed using high-grade materials, this piece is designed to elevate your space.
                  </p>
                  <p>
                    Whether you are looking for a unique gift or a statement piece for your desk, this item delivers on both aesthetics and durability.
                    Our post-processing ensures a smooth, premium touch that feels as good as it looks.
                  </p>
                </motion.div>
              )}
              {activeTab === 'specs' && (
                <motion.div
                  key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4 max-w-lg">
                    <SpecRow label="Material" value={product.specs.material} />
                    <SpecRow label="Dimensions" value={product.specs.dimensions} />

                  </div>
                </motion.div>
              )}
              {activeTab === 'shipping' && (
                <motion.div
                  key="shipping" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Start dispatch within 24-48 hours.</li>
                    <li>Delivered safely in 3-layer protective packaging.</li>
                    <li>Easy 7-day return policy for damaged items.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden space-y-2">
            <AccordionItem title="Product Description">
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience the perfect blend of artistry and precision with the <span className="font-semibold text-slate-900">{product.name}</span>.
                Meticulously 3D printed using high-grade materials, this piece is designed to elevate your space.
              </p>
            </AccordionItem>
            <AccordionItem title="Specifications">
              <div className="grid grid-cols-1 gap-3">
                <SpecRow label="Material" value={product.specs.material} />
                <SpecRow label="Dimensions" value={product.specs.dimensions} />

              </div>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li>Start dispatch within 24-48 hours.</li>
                <li>Delivered safely in 3-layer protective packaging.</li>
                <li>Easy 7-day return policy for damaged items.</li>
              </ul>
            </AccordionItem>
          </div>

        </div>

        {/* --- PRODUCT REVIEWS --- */}
        <ProductReviews productId={product.id} />
      </main>

      {/* --- MOBILE STICKY BOTTOM BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex gap-4 items-center">
          {/* Mobile Quantity */}
          <div className="flex items-center border border-slate-200 rounded-none h-12 bg-slate-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-900 w-6 text-center text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            className={`flex-1 h-12 text-white font-bold rounded-none shadow-lg ${isAdded ? 'bg-green-600' : 'bg-slate-900'}`}
          >
            {isAdded ? "Go to Cart" : `Add - ₹${(product.price * quantity).toLocaleString()}`}
          </Button>
        </div>
      </div>

    </div>
  );
}

// Helper Components
function HighlightItem({ icon, label, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-6 h-6 rounded-none bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
        {icon}
      </div>
      <p className="text-sm text-slate-600">
        <span className="font-bold text-slate-900">{label}</span>
        {text}
      </p>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between border-b md:border-b-0 border-slate-50 pb-2 md:pb-0">
      <span className="text-slate-400 text-sm font-medium">{label}</span>
      <span className="text-slate-900 font-semibold">{value}</span>
    </div>
  )
}

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-none overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-700 font-sm">{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''} `} />
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-slate-100 animate-in slide-in-from-top-2 fade-in">
          {children}
        </div>
      )}
    </div>
  )
}



export default ProductDetail;
