// backend/routes/chatRoutes.js
import express from "express";
import {
  getChat,
  sendMessage,
  getUserChats,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user/:userId", protect, getUserChats);
router.post("/send", protect, sendMessage);
router.get("/:userId1/:userId2", protect, getChat);

export default router;
