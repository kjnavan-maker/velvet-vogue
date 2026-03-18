import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function FeaturedCollection() {
  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <div className="grid items-center gap-10 rounded-[2rem] bg-white p-6 shadow-soft md:p-8 lg:grid-cols-2 lg:p-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              Featured Collection
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Elevated essentials for a refined everyday wardrobe
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              From clean tailoring to modern minimal accessories, our featured selection is shaped
              for style-conscious customers who want sophistication without excess.
            </p>
            <Link to="/shop?featured=true" className="btn-primary mt-8">
              Shop Featured Edit
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[1.75rem]"
          >
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80"
              alt="Featured fashion collection"
              className="h-[420px] w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;