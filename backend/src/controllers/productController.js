import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getProducts = asyncHandler(async (req, res) => {
  const {
    keyword = "",
    category,
    gender,
    clothingType,
    size,
    color,
    minPrice,
    maxPrice,
    sort = "latest",
    featured,
    newArrival,
    bestSeller,
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
      { clothingType: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category) query.category = category;
  if (gender) query.gender = gender;
  if (clothingType) query.clothingType = clothingType;
  if (size) query.sizes = { $in: [size] };
  if (color) query.colors = { $in: [color] };
  if (featured === "true") query.featured = true;
  if (newArrival === "true") query.newArrival = true;
  if (bestSeller === "true") query.bestSeller = true;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = { createdAt: -1 };

  switch (sort) {
    case "price-asc":
      sortOption = { price: 1 };
      break;
    case "price-desc":
      sortOption = { price: -1 };
      break;
    case "name-asc":
      sortOption = { name: 1 };
      break;
    case "name-desc":
      sortOption = { name: -1 };
      break;
    case "rating":
      sortOption = { rating: -1 };
      break;
    case "stock":
      sortOption = { stock: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const pageNumber = Number(page);
  const pageSize = Number(limit);

  const totalProducts = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sortOption)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  const filterMeta = await Product.aggregate([
    {
      $facet: {
        categories: [{ $group: { _id: "$category" } }, { $sort: { _id: 1 } }],
        clothingTypes: [{ $group: { _id: "$clothingType" } }, { $sort: { _id: 1 } }],
        colors: [{ $unwind: "$colors" }, { $group: { _id: "$colors" } }, { $sort: { _id: 1 } }],
        sizes: [{ $unwind: "$sizes" }, { $group: { _id: "$sizes" } }, { $sort: { _id: 1 } }],
      },
    },
  ]);

  res.json({
    products,
    page: pageNumber,
    pages: Math.ceil(totalProducts / pageSize),
    totalProducts,
    filters: {
      categories: filterMeta[0].categories.map((item) => item._id),
      clothingTypes: filterMeta[0].clothingTypes.map((item) => item._id),
      colors: filterMeta[0].colors.map((item) => item._id),
      sizes: filterMeta[0].sizes.map((item) => item._id),
    },
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    $or: [{ category: product.category }, { clothingType: product.clothingType }],
  }).limit(4);

  res.json({
    product,
    relatedProducts,
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    gender,
    clothingType,
    sizes,
    colors,
    price,
    stock,
    images,
    featured,
    newArrival,
    bestSeller,
    rating,
  } = req.body;

  if (!name || !description || !category || !gender || !clothingType || price === undefined) {
    res.status(400);
    throw new Error("Missing required product fields");
  }

  const product = await Product.create({
    name,
    description,
    category,
    gender,
    clothingType,
    sizes: Array.isArray(sizes) ? sizes : [],
    colors: Array.isArray(colors) ? colors : [],
    price,
    stock: stock || 0,
    images: Array.isArray(images) && images.length > 0 ? images : [],
    featured: Boolean(featured),
    newArrival: Boolean(newArrival),
    bestSeller: Boolean(bestSeller),
    rating: rating || 4.5,
  });

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatableFields = [
    "name",
    "description",
    "category",
    "gender",
    "clothingType",
    "sizes",
    "colors",
    "price",
    "stock",
    "images",
    "featured",
    "newArrival",
    "bestSeller",
    "rating",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({ message: "Product removed successfully" });
});