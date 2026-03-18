import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import formatCurrency from "../../utils/formatCurrency";

function ProductInfo({ product, onAddToCart, onBuyNow, feedback }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart({
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      className="card-surface p-6 lg:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velvet-gold">
        {product.category}
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-slate-900">{product.name}</h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <span className="text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</span>
        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
        </span>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
          Rating {product.rating}/5
        </span>
      </div>

      <div className="mt-8 grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900">Size</label>
          <div className="flex flex-wrap gap-3">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedSize === size
                    ? "border-velvet-gold bg-velvet-gold text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-velvet-gold"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900">Color</label>
          <div className="flex flex-wrap gap-3">
            {product.colors?.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedColor === color
                    ? "border-velvet-gold bg-velvet-gold text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-velvet-gold"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900">Quantity</label>
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="rounded-full px-4 py-2 text-lg"
            >
              −
            </button>
            <span className="min-w-12 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => Math.min(product.stock || 1, prev + 1))}
              className="rounded-full px-4 py-2 text-lg"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleAdd} className="w-full" disabled={product.stock <= 0}>
            Add to Cart
          </Button>
          <Button onClick={handleBuyNow} className="w-full" variant="secondary" disabled={product.stock <= 0}>
            Buy Now
          </Button>
        </div>

        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-green-600"
          >
            {feedback}
          </motion.p>
        )}

        <div className="grid gap-3 rounded-3xl bg-velvet-cream p-5 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Gender:</span> {product.gender}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Type:</span> {product.clothingType}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Style Note:</span> Pair with minimalist
            accessories for a premium balanced look.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductInfo;