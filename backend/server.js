import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import inquiryRoutes from "./src/routes/inquiryRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import { notFound } from "./src/middleware/notFoundMiddleware.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "Velvet Vogue API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});