import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ name: 1 });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Name and description are required");
  }

  const existing = await Category.findOne({ name });

  if (existing) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({ name, description });
  res.status(201).json(category);
});