import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  res.status(201).json({
    message: "Image uploaded successfully",
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

export default router;