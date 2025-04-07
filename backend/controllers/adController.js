//controllers\adController.js
import Ad from "../models/Ad.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const query = req.query.user ? { user: req.query.user } : {};
    const ads = await Ad.find(query);
    res.json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ads", error: error.message });
  }
};

export const getExporterAds = async (req, res) => {
  try {
    const { category, location, sort } = req.query;
    let query = { type: "exporter", status: "approved" };
    if (category) query.category = category;
    if (location) query.location = location;
    const ads = await Ad.find(query).sort(
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 }
    );
    res.json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch exporter ads", error: error.message });
  }
};

export const getManufacturerAds = async (req, res) => {
  try {
    const { category, location, sort } = req.query;
    let query = { type: "manufacturer", status: "approved" };
    if (category) query.category = category;
    if (location) query.location = location;
    const ads = await Ad.find(query).sort(
      sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 }
    );
    res.json(ads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch manufacturer ads",
      error: error.message,
    });
  }
};

export const createAd = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No images provided" });

    const {
      title,
      description,
      category,
      location,
      minPrice,
      maxPrice,
      unit,
      certifications,
    } = req.body;
    const uploadedImages = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const ad = await Ad.create({
      user: req.user.id,
      title,
      description,
      category,
      images: uploadedImages,
      location,
      minPrice,
      maxPrice,
      unit,
      certifications,
      type: req.user.role,
      status: "pending",
      reviews: [],
    });

    res.status(201).json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ad", error: error.message });
  }
};

export const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate(
      "user",
      "companyName name email phone website businessAddress role"
    );
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ad details", error: error.message });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.reviews.some((rev) => rev.user.toString() === req.user.id))
      return res
        .status(400)
        .json({ message: "You have already reviewed this ad" });
    ad.reviews.push({
      user: req.user.id,
      rating,
      comment,
      createdAt: new Date(),
    });
    await ad.save();
    res.json({ message: "Review submitted successfully", reviews: ad.reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting review", error: error.message });
  }
};

export const updateAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    ad.title = req.body.title || ad.title;
    ad.description = req.body.description || ad.description;
    ad.category = req.body.category || ad.category;
    ad.images = req.body.images || ad.images;
    ad.location = req.body.location || ad.location;
    if (req.body.minPrice !== undefined) ad.minPrice = req.body.minPrice;
    if (req.body.maxPrice !== undefined) ad.maxPrice = req.body.maxPrice;
    if (req.body.unit !== undefined) ad.unit = req.body.unit;
    ad.certifications = req.body.certifications || ad.certifications;
    ad.status = req.body.status || ad.status;

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ad", error: error.message });
  }
};

export const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
    await ad.deleteOne();
    res.json({ message: "Ad removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ad", error: error.message });
  }
};

export const searchAds = async (req, res) => {
  try {
    const { term } = req.query;
    if (!term)
      return res.status(400).json({ message: "Search term is required" });
    const ads = await Ad.find({
      $or: [
        { title: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
        { companyName: { $regex: term, $options: "i" } },
      ],
    });
    res.json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching ads", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("exporter", "companyName email")
      .populate("manufacturer", "companyName email")
      .populate("ad", "title minPrice maxPrice unit");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const requestOrder = async (req, res) => {
  try {
    const { adId, quantity } = req.body;
    if (!adId || !quantity)
      return res
        .status(400)
        .json({ message: "Ad ID and quantity are required" });
    const ad = await Ad.findById(adId).populate("user");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.reviews.find((rev) => rev.user.toString() === req.user.id))
      return res
        .status(400)
        .json({ message: "You have already requested this order." });
    const newOrder = await Order.create({
      exporter: ad.user._id,
      manufacturer: req.user.id,
      ad: ad._id,
      quantity,
      status: "Pending",
    });
    res
      .status(201)
      .json({ message: "Order request sent successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({
      message: "Error processing order request",
      error: error.message,
    });
  }
};
