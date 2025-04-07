import dotenv from "dotenv";
dotenv.config();

import express from "express";
import corsMiddleware from "./config/cors.js";
import connectDB from "./config/db.js";
import path from "path";
import http from "http";
import mongoose from "mongoose";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Import Other Modules
import setupChatSocket from "./sockets/chatSocket.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Connect to MongoDB
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/profile", profileRoutes);

// Search API
import Ad from "./models/Ad.js";
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) return res.status(400).json({ message: "Query is required" });
    const ads = await Ad.find({ title: new RegExp(query, "i") });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});

// Error Handling Middleware
app.use(errorMiddleware);

// Setup Chat Socket
setupChatSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
