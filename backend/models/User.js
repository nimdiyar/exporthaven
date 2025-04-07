// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["exporter", "manufacturer", "admin"],
      required: true,
    },
    companyName: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    contactPerson: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    phone: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    website: { type: String },
    businessAddress: {
      street: {
        type: String,
        required: function () {
          return this.role !== "admin";
        },
      },
      city: {
        type: String,
        required: function () {
          return this.role !== "admin";
        },
      },
      province: {
        type: String,
        required: function () {
          return this.role !== "admin";
        },
      },
      postalCode: {
        type: String,
        required: function () {
          return this.role !== "admin";
        },
      },
    },
    profilePhoto: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedIn: String,
      youtube: String,
    },
    gallery: [{ type: String }],
    posts: [
      {
        title: String,
        description: String,
        image: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    exportType: {
      type: String,
      required: function () {
        return this.role === "exporter";
      },
    },
    establishmentDate: { type: Date },
    businessRegNumber: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    tin: {
      type: String,
      required: function () {
        return this.role !== "admin";
      },
    },
    exportLicense: { type: String },
    exportMarkets: { type: [String] },
    products: { type: [String] },
    shippingMethods: { type: [String] },
    certifications: { type: [String] },
    manufacturerType: {
      type: String,
      required: function () {
        return this.role === "manufacturer";
      },
    },
    productionCapacity: {
      type: String,
      required: function () {
        return this.role === "manufacturer";
      },
    },
    mainProducts: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
