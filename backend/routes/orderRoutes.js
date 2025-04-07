// backend/routes/orderRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  requestOrder,
  updateOrderStatus,
  getManufacturerOrders,
  getExporterOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", protect, requestOrder);
router.put("/:orderId", protect, updateOrderStatus);
router.get("/manufacturer", protect, getManufacturerOrders);
router.get("/exporter", protect, getExporterOrders);

export default router;
