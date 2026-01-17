import vaseImage from "../assets/productImages/vaseImage.png";
import lithophane from "../assets/productImages/lithophane.jpeg";
import shivaStatue from "../assets/productImages/shivaStatue.png";
import lionStand from "../assets/productImages/LionStand.png";
import ganesha from "../assets/productImages/ganesha.png";
import planter from "../assets/productImages/planter.png";
import mechanicalParts from "../assets/productImages/mechanical_parts.png";
import moonLamp from "../assets/productImages/moon_lamp.png";
import animeFigurine from "../assets/productImages/anime_figurine.png";
import penStand from "../assets/productImages/pen_stand.png";
import nameplate from "../assets/productImages/nameplate.png";
import wallArt from "../assets/productImages/wall_art.png";
import lithophanePortrait from "../assets/productImages/lithophane_portrait.png";
import keychain from "../assets/productImages/keychain.png";
import rocket from "../assets/productImages/rocket.png";
import organizer from "../assets/productImages/organizer.png";
import gearbox from "../assets/productImages/gearbox.png";
import trophy from "../assets/productImages/trophy.png";

export const PRODUCTS = [
  {
    id: 1,
    name: "Geometric Vase - Spiral Edition",
    category: "Vases",
    price: 1299,
    discountPercent: 15,
    rating: 4.9,
    reviews: 124,
    image: vaseImage,
    images: [vaseImage],
    description: "Modern spiral design vase, perfect for dried flowers or minimal decor setups.",
    details: [
      "Spiral geometry design that looks premium even without flowers.",
      "Perfect for living room shelves, work desk decor, or gifting.",
      "Lightweight but sturdy with a clean matte finish."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      weight: "200g",
      dimensions: "12cm x 12cm x 22cm",
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
    image: lithophane,
    images: [lithophane],
    description: "Custom lithophane cube that glows beautifully when lit. A unique gift idea.",
    details: [
      "Your photo becomes a 3D lithophane that reveals detail when backlit.",
      "Works best with warm white LED or phone flashlight behind it.",
      "A meaningful gift for birthdays, memories, and keepsakes."
    ],
    specs: {
      material: "White PLA",
      weight: "80g",
      dimensions: "10cm x 10cm x 10cm",
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
    image: ganesha,
    images: [ganesha],
    description: "Detailed Lord Ganesha miniature with premium metallic finish and smooth detailing.",
    details: [
      "High-detail miniature with sharp features and smooth curves.",
      "Gold silk finish gives it a premium metallic look.",
      "Ideal for desk mandir, gifting, or festive decor."
    ],
    specs: {
      material: "Silk PLA (Gold)",
      weight: "150g",
      dimensions: "7cm x 7cm x 15cm",
    }
  },
  {
    id: 4,
    name: "Low-Poly Planter - Desk Edition",
    category: "Planters",
    price: 899,
    discountPercent: 10,
    rating: 4.7,
    reviews: 56,
    image: planter,
    images: [planter],
    description: "Cute low-poly planter for succulents, desk plants and small indoor greens.",
    details: [
      "Low-poly design that instantly upgrades any desk setup.",
      "Perfect fit for small succulents and indoor mini plants.",
      "Lightweight and easy to clean (recommended for indoor use)."
    ],
    specs: {
      material: "Wood-infused PLA",
      weight: "120g",
      dimensions: "10cm x 10cm x 8cm",
    }
  },
  {
    id: 5,
    name: "Custom Mechanical Parts (Prototype Batch)",
    category: "Custom Projects",
    price: 2999,
    discountPercent: 0,
    rating: 4.9,
    reviews: 32,
    image: mechanicalParts,
    images: [mechanicalParts],
    description: "Functional prototype parts printed in PETG/ABS/Nylon based on requirement.",
    details: [
      "Designed for functional use in engineering and prototype builds.",
      "Material selection depends on strength, heat and load requirements.",
      "Send your STL/file and we’ll suggest the best print settings."
    ],
    specs: {
      material: "PETG / ABS / Nylon",
      weight: "Variable",
      dimensions: "Custom",
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
    image: moonLamp,
    images: [moonLamp],
    description: "Realistic moon lamp with touch control and multiple color modes. Cozy vibes.",
    details: [
      "Detailed moon surface texture for a realistic look.",
      "Perfect bedside lamp for warm cozy lighting.",
      "Rechargeable and easy to use for daily night lighting."
    ],
    specs: {
      material: "White PLA",
      weight: "450g",
      dimensions: "15cm diameter",
    }
  },
  {
    id: 7,
    name: "Anime Figurine - Chibi Hero",
    category: "Figurines",
    price: 1399,
    discountPercent: 10,
    rating: 4.7,
    reviews: 188,
    image: animeFigurine,
    images: [animeFigurine],
    description: "Cute chibi-style figure with premium detailing. Perfect for collectors and gifts.",
    details: [
      "Chibi character proportions with smooth detailing.",
      "Looks great on desk shelves and collector setups.",
      "A perfect gift for anime and pop-culture lovers."
    ],
    specs: {
      material: "PLA+",
      weight: "120g",
      dimensions: "8cm x 6cm x 12cm",
    }
  },
  {
    id: 8,
    name: "Minimal Pen Stand - Grid Series",
    category: "Desk Accessories",
    price: 499,
    discountPercent: 5,
    rating: 4.6,
    reviews: 94,
    image: penStand,
    images: [penStand],
    description: "Minimal pen stand for a clean desk setup. Lightweight and super practical.",
    details: [
      "Minimal grid look for clean modern desk setups.",
      "Holds pens, markers and small tools neatly.",
      "Lightweight and strong enough for daily use."
    ],
    specs: {
      material: "PLA (Matte)",
      weight: "90g",
      dimensions: "10cm x 6cm x 9cm",
    }
  },
  {
    id: 9,
    name: "Nameplate - Premium Desktop Style",
    category: "Customized Gifts",
    price: 699,
    discountPercent: 20,
    rating: 4.8,
    reviews: 210,
    image: nameplate,
    images: [nameplate],
    description: "Custom nameplate for your desk. Great for gifts, office tables, and study setup.",
    details: [
      "Personalized nameplate with a premium desktop look.",
      "Great for office desks, study tables and gifting.",
      "Customizable in name, font style and size."
    ],
    specs: {
      material: "PLA+",
      weight: "110g",
      dimensions: "16cm x 4cm x 5cm",
    }
  },
  {
    id: 10,
    name: "Wall Art Panel - Abstract Waves",
    category: "Home Decor",
    price: 1899,
    discountPercent: 10,
    rating: 4.9,
    reviews: 71,
    image: wallArt,
    images: [wallArt],
    description: "Aesthetic 3D wall art panel with an abstract wave texture. Looks premium on any wall.",
    details: [
      "Abstract wave texture gives a premium 3D wall decor vibe.",
      "Looks best on neutral walls and warm lighting.",
      "Lightweight and easy to mount with hooks or tape."
    ],
    specs: {
      material: "PLA (Textured Finish)",
      weight: "300g",
      dimensions: "25cm x 25cm",
    }
  },
  {
    id: 11,
    name: "Photo Lithophane - Portrait Frame",
    category: "Lithophanes",
    price: 999,
    discountPercent: 5,
    rating: 4.9,
    reviews: 132,
    image: lithophanePortrait,
    images: [lithophanePortrait],
    description: "Your favourite photo converted into a lithophane frame. Looks insane when backlit.",
    details: [
      "Photo-to-3D conversion with detailed lithophane layers.",
      "Best effect comes with a warm LED/light behind it.",
      "Perfect for gifting and memory keepsakes."
    ],
    specs: {
      material: "White PLA",
      weight: "130g",
      dimensions: "14cm x 10cm",
    }
  },
  {
    id: 12,
    name: "Keychain Set - Personalized Pack",
    category: "Customized Gifts",
    price: 399,
    discountPercent: 0,
    rating: 4.6,
    reviews: 260,
    image: keychain,
    images: [keychain],
    description: "Personalized keychain pack. Add names, initials, or custom icons.",
    details: [
      "Custom keychains for couples, friends and gifting.",
      "Add names, initials, or a simple logo/icon.",
      "Lightweight, strong, and daily-use friendly."
    ],
    specs: {
      material: "PLA+",
      weight: "40g",
      dimensions: "4cm x 4cm each",
    }
  },
  {
    id: 13,
    name: "Mini Rocket Model - Desk Decor",
    category: "Artifacts",
    price: 1199,
    discountPercent: 15,
    rating: 4.8,
    reviews: 68,
    image: rocket,
    images: [rocket],
    description: "A premium desk rocket model. Great for space lovers and clean desk setups.",
    details: [
      "Clean rocket model with premium desk decor vibe.",
      "Perfect for space lovers, students, and office desks.",
      "Stable base and smooth matte finish."
    ],
    specs: {
      material: "PLA (Matte)",
      weight: "180g",
      dimensions: "7cm x 7cm x 20cm",
    }
  },
  {
    id: 14,
    name: "Modular Drawer Organizer - Desk Kit",
    category: "Academic Utilities",
    price: 999,
    discountPercent: 10,
    rating: 4.7,
    reviews: 47,
    image: organizer,
    images: [organizer],
    description: "Modular organizer kit for pens, notes, tools, and accessories. Clean storage.",
    details: [
      "Modular compartments for stationery, tools and desk accessories.",
      "Helps keep study/work setup clean and organised.",
      "Works well inside drawers or directly on desk."
    ],
    specs: {
      material: "PLA+",
      weight: "240g",
      dimensions: "18cm x 12cm x 6cm",
    }
  },
  {
    id: 15,
    name: "Shiva Bust - Stone Finish",
    category: "God and Goddess Miniatures",
    price: 2199,
    discountPercent: 15,
    rating: 4.9,
    reviews: 143,
    image: shivaStatue,
    images: [shivaStatue],
    description: "Premium Shiva bust model with stone-style finish. Looks amazing as decor.",
    details: [
      "Stone-textured finish gives it a premium sculpture look.",
      "Ideal for decor corners, desk mandir, and gifting.",
      "Printed with smooth details and clean edges."
    ],
    specs: {
      material: "PLA (Stone Finish)",
      weight: "320g",
      dimensions: "12cm x 10cm x 20cm",
    }
  },
  {
    id: 16,
    name: "Gearbox Model - Engineering Demo Kit",
    category: "Academic Utilities",
    price: 1799,
    discountPercent: 0,
    rating: 4.8,
    reviews: 39,
    image: gearbox,
    images: [gearbox],
    description: "Mechanical demo model for academics. Perfect for practical learning and presentations.",
    details: [
      "Ideal for mechanical demos, presentations and lab models.",
      "Shows gear motion clearly for better understanding.",
      "Can be customized in size as per requirement."
    ],
    specs: {
      material: "PLA+ / PETG (Optional)",
      weight: "260g",
      dimensions: "15cm x 10cm x 9cm",
    }
  },
  {
    id: 17,
    name: "Custom Trophy - Event Memento",
    category: "Mementoes",
    price: 1499,
    discountPercent: 10,
    rating: 4.9,
    reviews: 92,
    image: trophy,
    images: [trophy],
    description: "Custom trophy/memento for events, competitions and college fests.",
    details: [
      "Perfect for college fests, competitions and award ceremonies.",
      "Customizable with event name, logo, and winner title.",
      "Premium finish that looks great on stage and photos."
    ],
    specs: {
      material: "PLA+ (Metallic Optional)",
      weight: "220g",
      dimensions: "10cm x 7cm x 18cm",
    }
  },
  {
    id: 18,
    name: "Phone Stand - Foldable Minimal",
    category: "Desk Accessories",
    price: 349,
    discountPercent: 0,
    rating: 4.5,
    reviews: 310,
    image: lionStand,
    images: [lionStand],
    description: "Minimal foldable phone stand for desk setup. Perfect for study and work mode.",
    details: [
      "Foldable minimal stand for any desk setup.",
      "Comfortable viewing angle for calls, reels, and study videos.",
      "Small, portable, and daily-use friendly."
    ],
    specs: {
      material: "PLA (Matte)",
      weight: "60g",
      dimensions: "9cm x 7cm x 2cm",
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
