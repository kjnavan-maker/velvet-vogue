import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Inquiry from "../models/Inquiry.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [usersCount, productsCount, ordersCount, inquiriesCount] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Inquiry.countDocuments(),
  ]);

  const totalRevenueResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const recentOrders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    stats: {
      usersCount,
      productsCount,
      ordersCount,
      inquiriesCount,
      totalRevenue: totalRevenueResult[0]?.totalRevenue || 0,
    },
    recentOrders,
  });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const validStatuses = [
    "Pending",
    "Processing",
    "Paid",
    "Demo Paid",
    "Awaiting Bank Transfer",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  if (!validStatuses.includes(orderStatus)) {
    res.status(400);
    throw new Error("Invalid order status");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.orderStatus = orderStatus;

  if (orderStatus === "Paid" || orderStatus === "Demo Paid") {
    order.isPaid = true;
    order.paidAt = order.paidAt || new Date();
  }

  const updatedOrder = await order.save();

  res.json({
    message: "Order status updated successfully",
    order: updatedOrder,
  });
});