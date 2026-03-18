import asyncHandler from "express-async-handler";
import User from "../models/User.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email?.toLowerCase() || user.email;
  user.address = {
    street: req.body.address?.street ?? user.address?.street ?? "",
    city: req.body.address?.city ?? user.address?.city ?? "",
    state: req.body.address?.state ?? user.address?.state ?? "",
    postalCode: req.body.address?.postalCode ?? user.address?.postalCode ?? "",
    country: req.body.address?.country ?? user.address?.country ?? "",
  };

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    message: "Profile updated successfully",
    user: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      address: updatedUser.address,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    },
  });
});