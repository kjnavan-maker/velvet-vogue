import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";

const categories = [
  {
    title: "Casualwear",
    description: "Relaxed essentials with premium silhouettes and effortless everyday styling.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Formal Wear",
    description: "Sharp, clean tailoring for elevated moments and polished confidence.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Accessories",
    description: "Finishing touches that complete every modern wardrobe with sophistication.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
];

function CategoryHighlights() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Curated Categories"
          title="Designed for every side of your style"
          description="Velvet Vogue brings together clean essentials, refined tailoring, and premium accessories in one unified fashion destination."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-soft"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                <Link
                  to="/shop"
                  className="mt-5 inline-flex text-sm font-semibold text-slate-900 transition hover:text-velvet-gold"
                >
                  Explore Collection →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryHighlights;