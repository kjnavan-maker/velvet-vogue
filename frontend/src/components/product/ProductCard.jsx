import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import formatCurrency from "../../utils/formatCurrency";

function ProductCard({ product, index = 0 }) {
  const productImage =
    product.images?.[0] && product.images[0].trim() !== ""
      ? product.images[0]
      : "/src/assets/placeholder-fashion.svg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-[2rem] bg-white shadow-soft"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={productImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = "/src/assets/placeholder-fashion.svg";
            }}
            className="h-80 w-full object-cover transition duration-1000 group-hover:scale-[1.06]"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.newArrival && (
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-900">
                New
              </span>
            )}
            {product.bestSeller && (
              <span className="rounded-full bg-velvet-black px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                Best Seller
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-velvet-gold">
          {product.category}
        </p>
        <Link to={`/product/${product._id}`}>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 transition group-hover:text-velvet-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">{formatCurrency(product.price)}</p>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;