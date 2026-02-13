import rosepop from "../assets/productImages/rosepop.png";
import batmanFigurine from "../assets/productImages/batman_figurine.png";
import heartpop from "../assets/productImages/heartpop.png";
import hoodieHolder from "../assets/productImages/hoodie_penstand.png";
import sittingPlanter from "../assets/productImages/sitting_planter.png";
import aetherVase from "../assets/productImages/Aether_vase.png";

export const PRODUCTS = [
  {
    id: 1,
    name: "Rose Pop",
    category: "Valentines",
    price: 99,
    discountPercent: 15,
    rating: 4.9,
    reviews: 124,
    image: rosepop,
    images: [rosepop],
    description: "A cute gift sitting rose character for your dear valentine",
    details: [
      "A cute gift sitting rose character for your dear valentine",
      "Perfect for living room shelves, or gifting.",
      "Lightweight but sturdy with a clean finish."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      weight: "200g",
      dimensions: "12cm x 12cm x 22cm",
    }
  },
  {
    id: 2,
    name: "Batman – The Dark Knight",
    category: "Superheroes",
    price: 179,
    discountPercent: 10,
    rating: 4.8,
    reviews: 96,
    image: batmanFigurine,
    images: [batmanFigurine],
    description: "A fierce Dark Knight Batman figurine capturing the iconic vigilante stance.",
    details: [
      "Detailed Batman figurine inspired by the Dark Knight theme.",
      "Perfect for desks, gaming setups, or superhero collections.",
      "Compact yet bold presence with a premium matte finish."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "9cm x 9cm x 13cm"
    }
  },
  {
    id: 3,
    name: "Heart Pop",
    category: "Valentines",
    price: 125,
    discountPercent: 12,
    rating: 4.9,
    reviews: 87,
    image: heartpop,
    images: [heartpop],
    description: "An adorable sitting heart character designed to melt hearts instantly.",
    details: [
      "Cute heart figurine with playful legs and relaxed pose.",
      "Perfect Valentine’s gift for your special someone.",
      "Great for desks, bedside tables, or cozy shelf decor."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "Approx. 5cm x 5cm x 3cm"
    }
  },
  {
    id: 4,
    name: "Mini Hoodie Pen Holder",
    category: "Desk Decor",
    price: 499,
    discountPercent: 10,
    rating: 4.8,
    reviews: 63,
    image: hoodieHolder,
    images: [hoodieHolder],
    description: "A stylish mini hoodie-shaped pen holder that adds cozy vibes to your workspace.",
    details: [
      "Unique hoodie design with realistic folds and pocket detail.",
      "Perfect for holding pens, markers, or small desk essentials.",
      "Adds a fun and aesthetic touch to study tables and office desks."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "Approx. 9cm x 9cm x 12cm"
    }
  },
  {
    id: 5,
    name: "Sitting Planter",
    category: "Home Decor",
    price: 349,
    discountPercent: 15,
    rating: 4.9,
    reviews: 142,
    image: sittingPlanter,
    images: [sittingPlanter],
    description: "A cheerful sitting planter with playful chain legs that adds life and personality to any space.",
    details: [
      "Cute smiling face design with raised arms for a joyful vibe.",
      "Flexible chain-style legs that dangle beautifully from shelves or tables.",
      "Perfect for small indoor plants, succulents, or gifting."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "Approx. 12cm x 8cm x 5cm"
    }
  },
  {
    id: 6,
    name: "Aether Vase",
    category: "Home Decor",
    price: 599,
    discountPercent: 10,
    rating: 4.9,
    reviews: 58,
    image: aetherVase,
    images: [aetherVase],
    description: "A modern spiral-structured vase with an elegant lattice design that elevates any interior space.",
    details: [
      "Intricate geometric lattice pattern with smooth flowing curves.",
      "Minimal yet bold design for modern homes and studio spaces.",
      "Perfect as a statement decor piece or for holding dried flowers."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "Approx. 12cm x 12cm x 22cm"
    }
  }





];

// Enriched dataset
export const ENRICHED_PRODUCTS = PRODUCTS.map(p => {
  const originalPrice = p.discountPercent ? p.price / (1 - (p.discountPercent / 100)) : p.price;
  return {
    ...p,
    originalPrice: Math.round(originalPrice),
    images: p.images || [p.image]
  }
});

// Categories
export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

// default export
export { ENRICHED_PRODUCTS as default };
