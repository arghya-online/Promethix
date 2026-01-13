export const PRODUCTS = [
  {
    id: 1,
    name: "Geometric Vase - Spiral Edition",
    category: "Vases",
    price: 1299,
    discountPercent: 15,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1589820296156-2454dad33d94?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1589820296156-2454dad33d94?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Modern spiral design vase perfect for dried flowers or standalone decor.",
    specs: {
      material: "PLA+ (Matte Finish)",
      weight: "200g",
      dimensions: "12cm x 12cm x 22cm",
      printTime: "10 hours",
    }
  },
  {
    id: 2,
    name: "Lithophane Cube - Memorial",
    category: "Lithophanes",
    price: 799,
    discountPercent: 0,
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Custom lithophane cube that glows when lit from within. Perfect gift.",
    specs: {
      material: "White PLA",
      weight: "80g",
      dimensions: "10cm x 10cm x 10cm",
      printTime: "5 hours",
    }
  },
  {
    id: 3,
    name: "Ganesha Miniature - Gold Finish",
    category: "God and Goddess Miniatures",
    price: 1599,
    discountPercent: 20,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Intricately detailed Lord Ganesha miniature with a premium gold finish.",
    specs: {
      material: "Silk PLA (Gold)",
      weight: "150g",
      dimensions: "7cm x 7cm x 15cm",
      printTime: "12 hours",
    }
  },
  {
    id: 4,
    name: "Poly Low-Poly Planter",
    category: "Vases",
    price: 899,
    discountPercent: 10,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A cute low-poly planter for succulents and small indoor plants.",
    specs: {
      material: "Wood-infused PLA",
      weight: "120g",
      dimensions: "10cm x 10cm x 8cm",
      printTime: "6 hours",
    }
  },
  {
    id: 5,
    name: "Custom Mechanical Parts",
    category: "Custom Projects",
    price: 2999,
    discountPercent: 0,
    rating: 5.0,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Industrial strength parts printed in PETG or ABS for functional use.",
    specs: {
      material: "PETG / ABS / Nylon",
      weight: "Variable",
      dimensions: "Custom",
      printTime: "Variable",
    }
  },
  {
    id: 6,
    name: "Moon Lamp - Rechargeable",
    category: "Table Lamps",
    price: 2499,
    discountPercent: 25,
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Realistic 3D printed moon lamp with touch control and 3 color modes.",
    specs: {
      material: "White PLA",
      weight: "450g",
      dimensions: "15cm diameter",
      printTime: "18 hours",
    }
  }
];

// Calculate derived fields (like original price) implicitly if needed, 
// or keep them explicit in the JSON for simplicity.
// For now, we'll map over them to add the 'originalPrice' helper if it's missing
// but typically you'd just store it directly.

export const ENRICHED_PRODUCTS = PRODUCTS.map(p => {
  // If originalPrice isn't set but discount is, calculate it
  const originalPrice = p.price / (1 - (p.discountPercent / 100));
  return {
    ...p,
    originalPrice: Math.round(originalPrice),
    // Ensure images array exists
    images: p.images || [p.image]
  }
});

// Helper to get unique categories
export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))];

// Re-export the main list as PRODUCTS for compatibility (using the enriched version)
export { ENRICHED_PRODUCTS as default }; 
