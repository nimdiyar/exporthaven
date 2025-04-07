// backend/routes/profileRoutes.js
import express from "express";
import {
  updateCoverPhoto,
  updateBioAndSocial,
  addGalleryImage,
  removeGalleryImage,
  addPost,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

router.put("/cover", protect, upload.single("coverPhoto"), updateCoverPhoto);
router.put("/bio-social", protect, updateBioAndSocial);
router.post(
  "/gallery",
  protect,
  upload.single("galleryImage"),
  addGalleryImage
);
router.delete("/gallery", protect, removeGalleryImage);
router.post("/post", protect, upload.single("postImage"), addPost);

export default router;
