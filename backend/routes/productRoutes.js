const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { protect, adminOnly } = require("../middleware/auth");

// Initial seed products array for automatic database bootstrapping
const SEED_PRODUCTS = [
  {
    name: "Rose Pop Sitting Planter",
    description: "A cute gift sitting rose character for your dear valentine. Features posable jointed legs that sit on any monitor, desk, or shelf.",
    price: 99,
    originalPrice: 116,
    image: "/assets/productImages/rosepop.png",
    images: ["/assets/productImages/rosepop.png", "/assets/productImages/rosePop.png"],
    category: "Valentines",
    badge: "Sale",
    rating: 4.9,
    specs: { material: "PLA+ (Matte Finish)", dimensions: "12cm x 12cm x 22cm" }
  },
  {
    name: "Heart Pop Figurine",
    description: "Cute little heart figurine with posable jointed limbs. Perfect pocket size memento for expressions of love.",
    price: 99,
    originalPrice: 149,
    image: "/assets/productImages/heartpop.png",
    images: ["/assets/productImages/heartpop.png", "/assets/productImages/heartPop.png"],
    category: "Valentines",
    badge: "Hot",
    rating: 4.7,
    specs: { material: "PLA+ (Matte Finish)", dimensions: "10cm x 10cm x 18cm" }
  },
  {
    name: "Ganesha Idol",
    description: "Intricately detailed 3D printed Ganesha idol. A stunning spiritual focal point bringing wealth and success to your home.",
    price: 249,
    originalPrice: 299,
    image: "/assets/productImages/GaneshaIdol.png",
    images: ["/assets/productImages/GaneshaIdol.png"],
    category: "Idols",
    badge: "Best Seller",
    rating: 4.8,
    specs: { material: "Silk PLA (Gold Dust)", dimensions: "15cm x 15cm x 25cm" }
  },
  {
    name: "Shiva Meditating Figurine",
    description: "Elegant modern aesthetic layout depicting Lord Shiva in deep meditation. Crafted with fine matte polymers.",
    price: 349,
    originalPrice: 429,
    image: "/assets/productImages/shiva2.png",
    images: ["/assets/productImages/shiva2.png"],
    category: "Idols",
    badge: "New",
    rating: 4.9,
    specs: { material: "PLA+ (Frost White)", dimensions: "18cm x 14cm x 28cm" }
  },
  {
    name: "Batman Figurine",
    description: "Collector's edition detailed Batman desk statue. Excellent high-resolution layers with matte black finish.",
    price: 499,
    originalPrice: 599,
    image: "/assets/productImages/batman_figurine-DaU2X-A_.png",
    images: ["/assets/productImages/batman_figurine-DaU2X-A_.png"],
    category: "Superheroes",
    badge: "Elite",
    rating: 4.9,
    specs: { material: "PLA+ (Cyber Black)", dimensions: "22cm x 16cm x 30cm" }
  },
  {
    name: "Spiraled Geometric Vase",
    description: "Modern spiral geometric flower vase. Features organic mesh lines that play with sunlight and interior highlights.",
    price: 299,
    originalPrice: 349,
    image: "/assets/productImages/spiralVase.png",
    images: ["/assets/productImages/spiralVase.png"],
    category: "Home Decor",
    badge: "Popular",
    rating: 4.7,
    specs: { material: "PETG (Laser Teal)", dimensions: "14cm x 14cm x 25cm" }
  }
];

// @desc    Get all products (with optional auto-seeding if empty)
// @route   GET /api/products
router.get("/", async (req, res) => {
  try {
    let products = await Product.find({});
    
    // Auto-seed if database is blank
    if (products.length === 0) {
      console.log("Product database empty. Bootstrapping seed products...");
      await Product.insertMany(SEED_PRODUCTS);
      products = await Product.find({});
    }
    
    // Support basic search queries
    const q = req.query.q;
    if (q) {
      const searchRegex = new RegExp(q, "i");
      products = products.filter(p => 
        searchRegex.test(p.name) || 
        searchRegex.test(p.description) || 
        searchRegex.test(p.category)
      );
    }
    
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single product details
// @route   GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid product reference" });
  }
});

// @desc    Create new product
// @route   POST /api/products
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
