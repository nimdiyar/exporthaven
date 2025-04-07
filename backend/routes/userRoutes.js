// backend/routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    const query = {};
    if (role) query.role = role;
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
});

router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  upload.single("profilePhoto"),
  updateUserProfile
);

router.get("/public/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    delete user.password;
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching public user", error: error.message });
  }
});

export default router;
