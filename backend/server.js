const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load Environment Configuration
dotenv.config();

// Establish MongoDB Connection
connectDB();

const app = express();

// Standard Request Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Base Endpoint for Health Check
app.get("/", (req, res) => {
  res.json({
    name: "PROMETHIX3D Backend Server",
    status: "Healthy",
    time: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`PROMETHIX3D Node Server Running on Port: ${PORT}`);
});
