const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  category: {
    type: String,
    required: true,
    index: true
  },
  badge: {
    type: String
  },
  rating: {
    type: Number,
    default: 4.7
  },
  specs: {
    material: {
      type: String,
      default: "PLA Premium"
    },
    dimensions: {
      type: String,
      default: "Standard Scale"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Alias virtual field for front-end compatibility
productSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model("Product", productSchema);
