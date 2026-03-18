import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import User from "./src/models/User.js";
import Product from "./src/models/Product.js";
import Category from "./src/models/Category.js";
import Order from "./src/models/Order.js";
import Inquiry from "./src/models/Inquiry.js";
import categories from "./src/data/categories.js";
import users from "./src/data/users.js";
import products from "./src/data/products.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Product.deleteMany(),
      Category.deleteMany(),
      Order.deleteMany(),
      Inquiry.deleteMany(),
    ]);

    const createdUsers = [];

    for (const user of users) {
      const createdUser = await User.create(user);
      createdUsers.push(createdUser);
    }

    const adminUser = createdUsers.find((user) => user.role === "admin");
    const customerUser = createdUsers.find((user) => user.role === "customer");

    await Category.insertMany(categories);

    const createdProducts = await Product.insertMany(products);

    await Inquiry.insertMany([
      {
        name: "Sophie Hall",
        email: "sophie@example.com",
        subject: "Size availability for blazer",
        message: "Hello, will the Slim Fit Blazer be restocked in size XL next month?",
      },
      {
        name: "Nathan Gray",
        email: "nathan@example.com",
        subject: "Bulk corporate order",
        message: "We are interested in ordering formal shirts for a corporate team. Please contact us.",
      },
    ]);

    await Order.create({
      user: customerUser._id,
      orderItems: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          image: createdProducts[0].images[0],
          price: createdProducts[0].price,
          quantity: 1,
          size: "M",
          color: "Black",
        },
        {
          product: createdProducts[11]._id,
          name: createdProducts[11].name,
          image: createdProducts[11].images[0],
          price: createdProducts[11].price,
          quantity: 1,
          size: "One Size",
          color: "Gold",
        },
      ],
      shippingInfo: {
        fullName: customerUser.name,
        email: customerUser.email,
        phone: "+94 77 555 0123",
        street: "102 Park Lane",
        city: "Kandy",
        state: "Central Province",
        postalCode: "20000",
        country: "Sri Lanka",
      },
      paymentMethod: "Card",
      itemsPrice: createdProducts[0].price + createdProducts[11].price,
      shippingPrice: 12,
      totalAmount: createdProducts[0].price + createdProducts[11].price + 12,
      orderStatus: "Processing",
      isPaid: true,
    });

    console.log("Seed data inserted successfully");
    console.log(`Admin user: ${adminUser.email}`);
    console.log(`Customer user: ${customerUser.email}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();