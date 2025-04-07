//backend\controllers\profileController.js
import User from "../models/User.js";
import fs from "fs";
import path from "path";

export const updateCoverPhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (req.file) {
      user.coverPhoto = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cover photo", error: error.message });
  }
};

export const updateBioAndSocial = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.bio = req.body.bio || user.bio;
    user.socialMedia = { ...user.socialMedia, ...req.body.socialMedia };
    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating bio/social", error: error.message });
  }
};

export const addGalleryImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    user.gallery.push(imageUrl);
    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding gallery image", error: error.message });
  }
};

export const removeGalleryImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { imageUrl } = req.body;
    user.gallery = user.gallery.filter((img) => img !== imageUrl);
    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing gallery image", error: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { title, description } = req.body;
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    user.posts.push({ title, description, image: imageUrl });
    await user.save();
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding post", error: error.message });
  }
};
