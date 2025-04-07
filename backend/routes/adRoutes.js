// backend/routes/adRoutes.js
import express from "express";
import {
  getAllUsers,
  getAllAds,
  getAllOrders,
  getExporterAds,
  getManufacturerAds,
  createAd,
  getAdById,
  updateAd,
  deleteAd,
  searchAds,
  requestOrder,
  submitReview,
} from "../controllers/adController.js";
import { protect, adminProtect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 5), createAd);
router.get("/users", adminProtect, getAllUsers);
router.get("/ads", adminProtect, getAllAds);
router.get("/orders", adminProtect, getAllOrders);
router.get("/search", searchAds);
router.get("/", getAllAds);
router.get("/exporters", getExporterAds);
router.get("/manufacturers", getManufacturerAds);
router.get("/:id", getAdById);
router.put("/:id", protect, updateAd);
router.delete("/:id", protect, deleteAd);
router.post("/:id/review", protect, submitReview);
router.post("/:id/order", protect, requestOrder);

export default router;
