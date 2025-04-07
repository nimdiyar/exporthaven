// backend/routes/notificationRoutes.js
import express from "express";
import {
  getNotifications,
  markAllAsRead,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/markread", protect, markAllAsRead);

export default router;
