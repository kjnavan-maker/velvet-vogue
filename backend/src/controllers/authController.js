import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  address: user.address,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: "customer",
  });

  res.status(201).json({
    message: "Registration successful",
    token: generateToken(user._id, user.role),
    user: sanitizeUser(user),
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    message: "Login successful",
    token: generateToken(user._id, user.role),
    user: sanitizeUser(user),
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(sanitizeUser(req.user));
});