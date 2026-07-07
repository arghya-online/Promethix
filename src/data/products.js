import rosepop from "../assets/productImages/rosepop.png";
import batmanFigurine from "../assets/productImages/batman_figurine.png";
import heartpop from "../assets/productImages/heartpop.png";
import hoodieHolder from "../assets/productImages/hoodie_penstand.png";
import sittingPlanter from "../assets/productImages/sitting_planter.png";
import aetherVase from "../assets/productImages/Aether_vase.png";
import greenLamp from "../assets/productImages/greenLamp.jpeg";

// Showcase product imports
import kedarnath from "../assets/showcaseImages/kedarnath.png";
import swaraswati from "../assets/showcaseImages/swaraswati.png";
import buddhaIdol from "../assets/showcaseImages/buddhaIdol.png";
import ganeshaIdol from "../assets/showcaseImages/GaneshaIdol.png";
import shiva2 from "../assets/showcaseImages/shiva2.png";

import spiralVase from "../assets/showcaseImages/spiralVase.png";
import clayVase from "../assets/showcaseImages/3dPrintedClayVase.jpeg";
import c17Model from "../assets/showcaseImages/C-17GalaxyPlaneModel.png";
import charizard from "../assets/showcaseImages/PinkCharizardFigurine.png";
import tedxMemento from "../assets/showcaseImages/TedXMemento.png";
import dopamineMemento from "../assets/showcaseImages/dopamineMemento.png";
import drone from "../assets/showcaseImages/drone.png";
import heartFlowerPot from "../assets/showcaseImages/heartFlowerPot.png";
import heartPop from "../assets/showcaseImages/heartPop.png";
import hoodiePenstand from "../assets/showcaseImages/hoodieapenstand.png";
import iccesMemento from "../assets/showcaseImages/iccesMemento.png";
import jawSkull from "../assets/showcaseImages/jawSkull.png";
import jawSkull2 from "../assets/showcaseImages/jawSkull2.png";
import roboticArm from "../assets/showcaseImages/roboticArm.jpeg";
import rosePop from "../assets/showcaseImages/rosePop.png";

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
    price: 249,
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
    price: 399,
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
    id: 4,
    name: "Aesthetic Lamp",
    category: "Desk Decor",
    price: 470,
    discountPercent: 0,
    rating: 4.8,
    reviews: 63,
    image: greenLamp,
    images: [greenLamp],
    description: "A LED based Lamp to make your desk look premium",
    details: [
      "Unique design with realistic detail.",
      "Perfect for small desk essentials.",
      "Adds a fun and aesthetic touch to study tables and office desks."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "Approx. 9.5cm x 9.5cm x 12cm"
    }
  },
  {
    id: 5,
    name: "Sitting Planter",
    category: "Home Decor",
    price: 369,
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
  },
  {
    id: "SC-03",
    name: "Kedarnath Temple Model",
    category: "Idols",
    price: 2499,
    discountPercent: 20,
    rating: 4.9,
    reviews: 86,
    image: kedarnath,
    images: [kedarnath],
    description: "Highly detailed scale model of the sacred Kedarnath Temple.",
    details: [
      "Highly detailed temple architecture replica.",
      "Perfect addition to your prayer room or display shelf.",
      "Fine textured details resembling stone construction."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "18cm x 12cm x 15cm"
    }
  },
  {
    id: "SC-04",
    name: "Saraswati Idol",
    category: "Idols",
    price: 1299,
    discountPercent: 12,
    rating: 4.7,
    reviews: 19,
    image: swaraswati,
    images: [swaraswati],
    description: "Graceful Saraswati Idol depicting the goddess of knowledge, music, and art.",
    details: [
      "Graceful Saraswati posture with Veena details.",
      "Inspiring piece for study rooms and music spaces.",
      "Smooth curves and clean print lines."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "12cm x 8cm x 16cm"
    }
  },
  {
    id: "SC-05",
    name: "Buddha Figurine",
    category: "Idols",
    price: 1100,
    discountPercent: 15,
    rating: 4.8,
    reviews: 33,
    image: buddhaIdol,
    images: [buddhaIdol],
    description: "A serene Buddha figurine ideal for bringing calm and mindfulness to your space.",
    details: [
      "Serene meditating Buddha statue.",
      "Minimalist and calming design.",
      "Great for desks, zen gardens, or gift sets."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "10cm x 10cm x 14cm"
    }
  },
  {
    id: "SC-06",
    name: "Ganesha Idol",
    category: "Idols",
    price: 899,
    discountPercent: 10,
    rating: 4.9,
    reviews: 57,
    image: ganeshaIdol,
    images: [ganeshaIdol],
    description: "Charming 3D printed Ganesha idol bringing prosperity and good luck.",
    details: [
      "Charming Ganesha idol for a positive vibe.",
      "Perfect for car dashboards or compact shelves.",
      "High-precision printing with smooth contours."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "8cm x 8cm x 11cm"
    }
  },
  {
    id: "SC-07",
    name: "Lord Shiva Sculpture",
    category: "Idols",
    price: 999,
    discountPercent: 15,
    rating: 4.9,
    reviews: 64,
    image: shiva2,
    images: [shiva2],
    description: "Majestic meditating Lord Shiva sculpture in a modern minimalist style.",
    details: [
      "Majestic meditating Lord Shiva design.",
      "Strong artistic presence for your home.",
      "Clean detailing and premium finish."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "13cm x 10cm x 18cm"
    }
  },
  {
    id: "SC-08",
    name: "Parametric Spiral Vase",
    category: "Other",
    price: 749,
    discountPercent: 10,
    rating: 4.8,
    reviews: 22,
    image: spiralVase,
    images: [spiralVase],
    description: "Stunning parametric spiral design vase, perfect for dried flowers or standalone display.",
    details: [
      "Flowing parametric lines.",
      "Unique modern geometry.",
      "Designed for dry arrangements."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "12cm x 12cm x 22cm"
    }
  },
  {
    id: "SC-10",
    name: "C-17 Galaxy Airplane Model",
    category: "Other",
    price: 499,
    discountPercent: 10,
    rating: 4.9,
    reviews: 18,
    image: c17Model,
    images: [c17Model],
    description: "A highly detailed display model of the iconic C-17 Galaxy heavy transport airplane.",
    details: [
      "Precise scale model with accurate wings, landing gear, and engine details.",
      "Perfect display piece for aviation lovers and model collectors.",
      "Comes with a mounting stand."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "30cm x 28cm x 12cm"
    }
  },
  {
    id: "SC-11",
    name: "Pink Charizard Figurine",
    category: "Other",
    price: 300,
    discountPercent: 0,
    rating: 4.8,
    reviews: 41,
    image: charizard,
    images: [charizard],
    description: "An adorable custom pink-colored Charizard figurine, combining a fierce classic monster with a playful color palette.",
    details: [
      "Playful custom pink Charizard figurine.",
      "Great for pop culture fans and gaming desk setups.",
      "High detail wings, tail fire, and expression."
    ],
    specs: {
      material: "PLA+ (Matte Finish)",
      dimensions: "12cm x 10cm x 13cm"
    }
  },
  {
    id: "SC-12",
    name: "TEDx Event Memento",
    category: "Other",
    price: "Custom Order",
    discountPercent: 5,
    rating: 5.0,
    reviews: 7,
    image: tedxMemento,
    images: [tedxMemento],
    description: "Official TEDx event memento design, capturing ideas worth spreading in premium layers.",
    details: [
      "Sleek and professional event styling.",
      "Perfect keepsake or display piece for speakers and organizers.",
      "High contrast red and black design."
    ],
    specs: {
      material: "PLA+ (Premium Glossy)",
      dimensions: "15cm x 4cm x 10cm"
    }
  },
  {
    id: "SC-14",
    name: "Mini Drone",
    category: "Other",
    price: 2999,
    discountPercent: 8,
    rating: 4.9,
    reviews: 15,
    image: drone,
    images: [drone],
    description: "A lightweight, robust 3D printed drone frame prototype designed for testing stability and aerodynamics.",
    details: [
      "Optimized load distribution with hexagonal structural infills.",
      "Ready for hardware integration and custom configurations.",
      "High-durability material configuration."
    ],
    specs: {
      material: "PETG / Carbon-Fiber PLA",
      dimensions: "25cm x 25cm x 5cm"
    }
  },
  {
    id: "SC-15",
    name: "Heart-Shaped Flower Pot",
    category: "Other",
    price: 699,
    discountPercent: 15,
    rating: 4.8,
    reviews: 29,
    image: heartFlowerPot,
    images: [heartFlowerPot],
    description: "Charming heart-shaped mini flower pot, ideal for tiny succulents and window sill gardens.",
    details: [
      "Cute heart-shaped design.",
      "Water-resistant interior print lining.",
      "Perfect romantic gift for plant lovers."
    ],
    specs: {
      material: "PLA+ (Waterproofed)",
      dimensions: "9cm x 9cm x 8cm"
    }
  },
  {
    id: "SC-18",
    name: "ICCES Conference Memento",
    category: "Other",
    price: "Custom Order",
    discountPercent: 5,
    rating: 4.9,
    reviews: 6,
    image: iccesMemento,
    images: [iccesMemento],
    description: "Exclusive academic/corporate conference trophy style memento with high precision engraving effects.",
    details: [
      "Modern geometric trophy shape.",
      "Clean layering with contrasting color details.",
      "Premium weighted base structure."
    ],
    specs: {
      material: "PLA+ (Premium Metallic)",
      dimensions: "16cm x 5cm x 11cm"
    }
  },
  {
    id: "SC-19",
    name: "Anatomical Jaw & Skull Study",
    category: "Other",
    price: "Custom Order",
    discountPercent: 15,
    rating: 4.7,
    reviews: 24,
    image: jawSkull,
    images: [jawSkull],
    description: "Highly accurate anatomical replica of the human jaw and skull, ideal for educational and display purposes.",
    details: [
      "Detailed bone textures and anatomical markers.",
      "Perfect for medical students, biology classrooms, or unique decor.",
      "Robust construction."
    ],
    specs: {
      material: "PLA+ (Bone White Finish)",
      dimensions: "14cm x 11cm x 15cm"
    }
  },
  {
    id: "SC-20",
    name: "Anatomical Jaw & Skull Study (Alt)",
    category: "Other",
    price: "Custom Order",
    discountPercent: 10,
    rating: 4.8,
    reviews: 17,
    image: jawSkull2,
    images: [jawSkull2],
    description: "Alternate view anatomical skull study highlighting internal cavities and teeth positioning.",
    details: [
      "Highlights structural tooth alignment and dental roots.",
      "Excellent medical reference piece.",
      "Smooth finish with precise cavity resolution."
    ],
    specs: {
      material: "PLA+ (Bone White)",
      dimensions: "14cm x 11cm x 15cm"
    }
  },
  {
    id: "SC-21",
    name: "Robotic Arm Prototype Part",
    category: "Custom Order",
    price: "Custom Order",
    discountPercent: 10,
    rating: 4.9,
    reviews: 9,
    image: roboticArm,
    images: [roboticArm],
    description: "Functional mechanical part printed with high infill density for structural strength in robotic systems.",
    details: [
      "High tensile strength and wear resistance.",
      "Precision dimensions to fit standard servos and bearings.",
      "Designed for load-bearing robotics prototypes."
    ],
    specs: {
      material: "PETG / Tough PLA",
      dimensions: "15cm x 6cm x 8cm"
    }
  },
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
