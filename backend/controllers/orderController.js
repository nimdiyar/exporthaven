//controllers/orderController.js
import Order from "../models/Order.js";
import Ad from "../models/Ad.js";
import Notification from "../models/Notification.js";

export const requestOrder = async (req, res) => {
  try {
    const { adId, quantity } = req.body;
    if (!adId || !quantity)
      return res
        .status(400)
        .json({ message: "Ad ID and quantity are required" });
    const ad = await Ad.findById(adId).populate("user");
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    const existingOrder = await Order.findOne({
      ad: adId,
      manufacturer: req.user._id,
    });
    if (existingOrder)
      return res
        .status(400)
        .json({ message: "You have already requested this order." });
    const newOrder = await Order.create({
      exporter: ad.user._id,
      manufacturer: req.user._id,
      ad: ad._id,
      quantity,
      status: "Pending",
    });
    res
      .status(201)
      .json({ message: "Order request sent successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error processing order request",
        error: error.message,
      });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.user._id.toString() !== order.exporter.toString())
      return res
        .status(403)
        .json({
          message: "Unauthorized: Only the exporter can update this order",
        });
    order.status = status;
    const updatedOrder = await order.save();

    if (status === "Approved") {
      await Notification.create({
        user: order.manufacturer,
        message: "Your order has been approved by the exporter.",
        type: "order",
      });
    }

    res.json({ message: `Order marked as ${status}`, order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};

export const getManufacturerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ manufacturer: req.user._id })
      .populate("ad", "title price")
      .populate("exporter", "companyName email");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const getExporterOrders = async (req, res) => {
  try {
    const orders = await Order.find({ exporter: req.user._id })
      .populate("ad", "title price")
      .populate("manufacturer", "companyName email");
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};
