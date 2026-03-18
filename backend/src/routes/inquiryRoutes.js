import express from "express";
import { createInquiry, getInquiries } from "../controllers/inquiryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createInquiry).get(protect, adminOnly, getInquiries);

export default router;