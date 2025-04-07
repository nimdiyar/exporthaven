// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log("GMAIL AUTH:", process.env.EMAIL_USER, process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    authMethod: "LOGIN",
  },
});

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      companyName,
      contactPerson,
      phone,
      website,
      businessAddress,
      exportType,
      establishmentDate,
      businessRegNumber,
      tin,
      exportLicense,
      exportMarkets,
      products,
      shippingMethods,
      certifications,
      manufacturerType,
      productionCapacity,
      mainProducts,
    } = req.body;

    const errors = {};
    const userName = name || contactPerson;
    if (!userName) errors.name = "Name or contact person is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (role !== "admin") {
      if (!companyName) errors.companyName = "Company name is required";
      if (!phone) errors.phone = "Phone is required";
      if (!businessAddress || !businessAddress.street)
        errors.businessAddress = "Street address is required";
      if (!businessRegNumber)
        errors.businessRegNumber = "Business registration number is required";
      if (!tin) errors.tin = "TIN is required";
    }

    if (Object.keys(errors).length > 0) return res.status(400).json({ errors });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ errors: { email: "User already exists with this email" } });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: userName,
      email,
      password: hashedPassword,
      role,
      companyName,
      contactPerson,
      phone,
      website,
      businessAddress,
      exportType,
      establishmentDate,
      businessRegNumber,
      tin,
      exportLicense,
      exportMarkets,
      products,
      shippingMethods,
      certifications,
      manufacturerType,
      productionCapacity,
      mainProducts,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account found with this email" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect email or password" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: ${resetUrl}`,
    });
    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    res.status(500).json({
      message: "Error processing forgot password",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset failed", error });
  }
};
