import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    minPrice: { type: Number, required: false },
    maxPrice: { type: Number, required: false },
    unit: { type: String, required: false },
    certifications: [{ type: String }],
    type: { type: String, enum: ["exporter", "manufacturer"], required: true },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "active",
        "inactive",
        "completed",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
