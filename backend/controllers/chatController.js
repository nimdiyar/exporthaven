//backend\controllers\chatController.js
import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const adId = req.query.adId;
    const query = { participants: { $all: [userId1, userId2] } };
    if (adId) query.ad = adId;
    const chat = await Chat.findOne(query).populate(
      "messages.sender",
      "name email"
    );
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, adId, content, type } = req.body;
    const query = { participants: { $all: [senderId, receiverId] } };
    if (adId) query.ad = adId;
    let chat = await Chat.findOne(query);
    if (!chat) {
      chat = await Chat.create({
        ad: adId,
        participants: [senderId, receiverId],
        messages: [],
      });
    }
    const newMessage = {
      sender: senderId,
      content,
      type,
      timestamp: new Date(),
    };
    chat.messages.push(newMessage);
    await chat.save();

    await Notification.create({
      user: receiverId,
      message: "You have a new message.",
      type: "message",
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    const id = new mongoose.Types.ObjectId(userId);
    const chats = await Chat.find({ participants: { $in: [id] } }).lean();
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        const participantIds = chat.participants.map((p) => p.toString());
        const participants = await User.find(
          { _id: { $in: participantIds } },
          "name email"
        ).lean();
        return { ...chat, participants };
      })
    );
    res.json(populatedChats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user chats", error: error.message });
  }
};
