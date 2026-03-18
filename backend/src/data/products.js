const products = [
  {
    name: "Slim Fit Blazer",
    description:
      "A tailored slim fit blazer crafted for elevated evenings and polished formal layering. Designed with clean lapels, structured shoulders, and a refined silhouette.",
    category: "Men Formal Wear",
    gender: "men",
    clothingType: "Blazer",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Beige"],
    price: 149.99,
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1593032465171-8bd66f5f2be3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: false,
    bestSeller: true,
    rating: 4.8,
  },
  {
    name: "Oversized Graphic T-Shirt",
    description:
      "A youth-driven oversized graphic tee made for expressive streetwear styling. Soft cotton feel with premium print quality and a relaxed drop-shoulder cut.",
    category: "Men Casual Wear",
    gender: "men",
    clothingType: "T-Shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    price: 39.99,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: true,
    bestSeller: true,
    rating: 4.7,
  },
  {
    name: "Formal White Shirt",
    description:
      "A crisp formal white shirt with a clean modern fit. Ideal for business wear, formal events, and timeless wardrobe refinement.",
    category: "Men Formal Wear",
    gender: "men",
    clothingType: "Shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    price: 59.99,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=900&q=80"
    ],
    featured: false,
    newArrival: false,
    bestSeller: true,
    rating: 4.6,
  },
  {
    name: "High-Waist Trousers",
    description:
      "Elegant high-waist trousers with a flattering straight-leg finish. Designed to move from office styling to dinner-ready sophistication.",
    category: "Women Formal Wear",
    gender: "women",
    clothingType: "Trousers",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Beige", "Black"],
    price: 74.99,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: false,
    bestSeller: false,
    rating: 4.5,
  },
  {
    name: "Denim Jacket",
    description:
      "A premium-wash denim jacket with a structured yet comfortable fit. A timeless layer that brings edge and versatility to casual outfits.",
    category: "Women Casual Wear",
    gender: "women",
    clothingType: "Jacket",
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    price: 89.99,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: true,
    bestSeller: true,
    rating: 4.8,
  },
  {
    name: "Casual Sneakers",
    description:
      "Minimal fashion sneakers designed for everyday luxury comfort. Clean profile, cushioned sole, and versatile neutral styling.",
    category: "Accessories",
    gender: "unisex",
    clothingType: "Footwear",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: ["White", "Beige"],
    price: 99.99,
    stock: 32,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80"
    ],
    featured: false,
    newArrival: true,
    bestSeller: true,
    rating: 4.9,
  },
  {
    name: "Leather Belt",
    description:
      "A refined genuine-look leather belt with a sleek modern buckle. Built to complement both formal and smart casual wardrobes.",
    category: "Accessories",
    gender: "men",
    clothingType: "Belt",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Brown"],
    price: 34.99,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80"
    ],
    featured: false,
    newArrival: false,
    bestSeller: false,
    rating: 4.4,
  },
  {
    name: "Elegant Handbag",
    description:
      "A structured statement handbag with modern luxury detailing. Spacious, polished, and perfect for effortless day-to-night styling.",
    category: "Accessories",
    gender: "women",
    clothingType: "Handbag",
    sizes: ["One Size"],
    colors: ["Beige", "Black"],
    price: 119.99,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: false,
    bestSeller: true,
    rating: 4.8,
  },
  {
    name: "Printed Summer Dress",
    description:
      "A flowing printed summer dress with an airy silhouette and feminine detailing. Designed for warm days, stylish escapes, and standout ease.",
    category: "Women Casual Wear",
    gender: "women",
    clothingType: "Dress",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Cream", "Floral Blue"],
    price: 84.99,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    featured: false,
    newArrival: true,
    bestSeller: true,
    rating: 4.7,
  },
  {
    name: "Classic Polo T-Shirt",
    description:
      "A premium textured polo tee offering a clean smart-casual finish. Soft, breathable, and styled for elevated everyday wear.",
    category: "Men Casual Wear",
    gender: "men",
    clothingType: "Polo",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    price: 49.99,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    featured: false,
    newArrival: false,
    bestSeller: true,
    rating: 4.6,
  },
  {
    name: "Tailored Suit Jacket",
    description:
      "A contemporary tailored suit jacket with premium structure and sharp visual lines. Ideal for formal wardrobes built around confidence and precision.",
    category: "Men Formal Wear",
    gender: "men",
    clothingType: "Suit Jacket",
    sizes: ["M", "L", "XL"],
    colors: ["Charcoal", "Black"],
    price: 169.99,
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: false,
    bestSeller: false,
    rating: 4.7,
  },
  {
    name: "Minimalist Wristwatch",
    description:
      "A sleek minimalist wristwatch designed to deliver understated luxury. Clean dial, versatile styling, and a timeless finishing detail.",
    category: "Accessories",
    gender: "unisex",
    clothingType: "Watch",
    sizes: ["One Size"],
    colors: ["Gold", "Black", "Silver"],
    price: 129.99,
    stock: 21,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80"
    ],
    featured: true,
    newArrival: true,
    bestSeller: true,
    rating: 4.9,
  }
];

export default products;