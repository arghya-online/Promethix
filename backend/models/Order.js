const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  user: {
    uid: String,
    email: String,
    name: String
  },
  items: [{
    productId: String,
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    specs: {
      material: String,
      dimensions: String
    }
  }],
  isCustom: {
    type: Boolean,
    default: false
  },
  customSpecs: {
    size: Number,
    material: String,
    color: String,
    fileName: String
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "printing", "shipped", "delivered", "cancelled"],
    default: "pending",
    index: true
  },
  deliveryAddress: {
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    zipCode: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
