import asyncHandler from "express-async-handler";
import Inquiry from "../models/Inquiry.js";

export const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("All inquiry fields are required");
  }

  const inquiry = await Inquiry.create({
    name,
    email,
    subject,
    message,
  });

  res.status(201).json({
    message: "Inquiry submitted successfully",
    inquiry,
  });
});

export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
  res.json(inquiries);
});