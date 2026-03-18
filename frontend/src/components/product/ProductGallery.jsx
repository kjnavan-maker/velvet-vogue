import { useState } from "react";
import { motion } from "framer-motion";

function ProductGallery({ images = [] }) {
  const safeImages =
    images && images.length > 0
      ? images.filter((img) => img && img.trim() !== "")
      : ["/src/assets/placeholder-fashion.svg"];

  const [activeImage, setActiveImage] = useState(
    safeImages[0] || "/src/assets/placeholder-fashion.svg"
  );

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] bg-white shadow-soft"
      >
        <img
          src={activeImage}
          alt="Selected product"
          onError={(e) => {
            e.currentTarget.src = "/src/assets/placeholder-fashion.svg";
          }}
          className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
        />
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {safeImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-2xl border-2 ${
              activeImage === image ? "border-velvet-gold" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              onError={(e) => {
                e.currentTarget.src = "/src/assets/placeholder-fashion.svg";
              }}
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;