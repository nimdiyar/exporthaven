// backend/routes/adminRoutes.js
import express from "express";
import {
  getAdminDashboardStats,
  getAllUsers,
  deleteUser,
  getAllAds,
  approveAd,
  rejectAd,
  deleteAdAdmin,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminProtect, getAdminDashboardStats);
router.get("/users", protect, adminProtect, getAllUsers);
router.delete("/users/:id", protect, adminProtect, deleteUser);
router.get("/ads", protect, adminProtect, getAllAds);
router.put("/ads/:id/approve", protect, adminProtect, approveAd);
router.put("/ads/:id/reject", protect, adminProtect, rejectAd);
router.delete("/ads/:id", protect, adminProtect, deleteAdAdmin);
router.get("/orders", protect, adminProtect, getAllOrders);
router.put("/orders/:id", protect, adminProtect, updateOrderStatus);

export default router;
