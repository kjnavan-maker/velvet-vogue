import express from "express";
import { getAllOrders, getDashboardStats, updateOrderStatus } from "../controllers/adminController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id/status", protect, adminOnly, updateOrderStatus);

export default router;