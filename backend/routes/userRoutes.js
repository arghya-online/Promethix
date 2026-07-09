const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

// Token generation helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "promethix3d_jwt_secret_key_12345", {
    expiresIn: "30d"
  });
};

// @desc    Register a new user profile
// @route   POST /api/users/register
router.post("/register", async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

    // Set first user or specific emails as admin automatically
    let role = "user";
    if (email === "arghya.bandyopadhyay.3d@gmail.com" || email === "admin@promethix.com") {
      role = "admin";
    } else {
      const userCount = await User.countDocuments({});
      if (userCount === 0) {
        role = "admin";
      }
    }

    const user = await User.create({
      fullName,
      email,
      password,
      phone: phone || "",
      address: address || "",
      role,
      wishlist: []
    });

    console.log(`Registered user: ${email} (${role})`);

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Authenticate user login credentials
// @route   POST /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    console.log(`Logged in user: ${email}`);

    res.json({
      success: true,
      token: generateToken(user._id),
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        wishlist: user.wishlist
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get currently logged in profile details
// @route   GET /api/users/me
router.get("/me", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        phone: req.user.phone,
        address: req.user.address,
        role: req.user.role,
        wishlist: req.user.wishlist
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Toggle item in wishlist
// @route   POST /api/users/wishlist
router.post("/wishlist", protect, async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, message: "Product ID required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    res.json({ success: true, data: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
