//controllers/adminController.js
import User from "../models/User.js";
import Ad from "../models/Ad.js";
import Order from "../models/Order.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAds = await Ad.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingAds = await Ad.countDocuments({ status: "pending" });
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    res.json({ totalUsers, totalAds, totalOrders, pendingAds, pendingOrders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find({}).populate("user", "companyName name role");
    res.json(ads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ads", error: error.message });
  }
};

export const approveAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    if (ad.status === "approved")
      return res.status(400).json({ message: "Ad is already approved" });
    ad.status = "approved";
    const updatedAd = await ad.save();
    res.json({ message: "Ad approved successfully", ad: updatedAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to approve ad", error: error.message });
  }
};

export const rejectAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    ad.status = "rejected";
    await ad.save();
    res.json({ message: "Ad rejected successfully", ad });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject ad", error });
  }
};

export const deleteAdAdmin = async (req, res) => {
  try {
    await Order.deleteMany({ ad: req.params.id });
    const deletedAd = await Ad.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ message: "Ad not found" });
    res.json({ message: "Ad removed successfully", ad: deletedAd });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ad", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("ad");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
};
