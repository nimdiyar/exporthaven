// backend/routes/reviewRoutes.js
import express from "express";
import { submitReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:adId", protect, submitReview);

export default router;
