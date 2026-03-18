import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const shippingInfoSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items && items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    shippingInfo: {
      type: shippingInfoSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        "Card",
        "Cash on Delivery",
        "Bank Transfer",
        "Card Payment (Demo)",
        "Online Bank Transfer (Demo)",
      ],
    },
    paymentResult: {
      id: { type: String, default: "" },
      status: { type: String, default: "" },
      updateTime: { type: String, default: "" },
      emailAddress: { type: String, default: "" },
      mode: { type: String, default: "demo" },
    },
    itemsPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Paid",
        "Demo Paid",
        "Awaiting Bank Transfer",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;