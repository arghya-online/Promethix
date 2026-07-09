const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/auth");

// Helper middleware to extract optional auth tokens for guest checkout support
const optionalProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  if (!token) {
    return next();
  }

  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
      req.user = {
        uid: payload.user_id || payload.uid,
        email: payload.email,
        name: payload.name || "Firebase User"
      };
    }
  } catch (err) {
    console.warn("Optional Token Decode Failed (Proceeding as Guest):", err.message);
  }
  next();
};

// @desc    Place a new order (save record to MongoDB first, return details)
// @route   POST /api/orders
router.post("/", optionalProtect, async (req, res) => {
  const { items, isCustom, customSpecs, totalAmount, deliveryAddress } = req.body;

  if (!items && !isCustom) {
    return res.status(400).json({ success: false, message: "Order must have items or custom specifications" });
  }

  try {
    // Generate order number PMX-YYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `PMX-${dateStr}-${randomSuffix}`;

    const orderData = {
      orderNumber,
      items: items || [],
      isCustom: !!isCustom,
      customSpecs: customSpecs || {},
      totalAmount,
      deliveryAddress: deliveryAddress || {},
      status: "pending"
    };

    // If logged in user, associate account details
    if (req.user) {
      orderData.user = {
        uid: req.user.uid,
        email: req.user.email,
        name: req.user.name
      };
    }

    const order = await Order.create(orderData);
    console.log(`Placed and recorded new order: ${orderNumber}`);
    
    res.status(201).json({ success: true, orderNumber, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get logged in user's orders
// @route   GET /api/orders
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ "user.uid": req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin
router.get("/admin", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: "Order status is required" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
