import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalAmount,
    paymentResult,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items found");
  }

  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.name}`);
    }

    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }
  }

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }

  let isPaid = false;
  let paidAt = null;
  let orderStatus = "Pending";

  if (paymentMethod === "Card Payment (Demo)") {
    isPaid = true;
    paidAt = new Date();
    orderStatus = "Demo Paid";
  } else if (paymentMethod === "Online Bank Transfer (Demo)") {
    isPaid = true;
    paidAt = new Date();
    orderStatus = "Demo Paid";
  } else if (paymentMethod === "Cash on Delivery") {
    isPaid = false;
    orderStatus = "Pending";
  } else if (paymentMethod === "Bank Transfer") {
    isPaid = false;
    orderStatus = "Awaiting Bank Transfer";
  } else if (paymentMethod === "Card") {
    isPaid = true;
    paidAt = new Date();
    orderStatus = "Paid";
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingInfo,
    paymentMethod,
    paymentResult: paymentResult || {
      id: "",
      status: isPaid ? "COMPLETED" : "PENDING",
      updateTime: new Date().toISOString(),
      emailAddress: shippingInfo?.email || "",
      mode: paymentMethod.includes("Demo") ? "demo" : "manual",
    },
    itemsPrice,
    shippingPrice,
    totalAmount,
    orderStatus,
    isPaid,
    paidAt,
  });

  const populatedOrder = await Order.findById(order._id).populate("user", "name email");

  res.status(201).json({
    message: "Order placed successfully",
    order: populatedOrder,
  });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }

  res.json(order);
});