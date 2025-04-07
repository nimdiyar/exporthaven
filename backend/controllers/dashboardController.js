//controllers\dashboardController.js
import User from "../models/User.js";
import Ad from "../models/Ad.js";
import Order from "../models/Order.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAds = await Ad.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const pendingAds = await Ad.countDocuments({ status: "pending" });
    res.json({ totalUsers, totalAds, totalOrders, pendingOrders, pendingAds });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error });
  }
};

export const getUserDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const totalAds = await Ad.countDocuments({ user: userId });
    const totalOrders = await Order.countDocuments({ exporter: userId });
    const pendingOrders = await Order.countDocuments({
      exporter: userId,
      status: "Pending",
    });
    res.json({ totalAds, totalOrders, pendingOrders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user dashboard data", error });
  }
};
