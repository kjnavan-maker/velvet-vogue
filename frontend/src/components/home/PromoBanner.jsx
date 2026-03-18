import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PromoBanner() {
  return (
    <section className="pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] bg-velvet-black px-8 py-12 text-white md:px-12 lg:flex lg:items-center lg:justify-between"
        >
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-velvet-gold">
              Limited Time Edit
            </p>
            <h3 className="font-display text-3xl font-bold md:text-4xl">
              Modern silhouettes. Luxurious presence.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              Step into the latest curated drop of fashion-forward essentials with premium finishes
              and timeless structure.
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <Link
              to="/shop?newArrival=true"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Discover New Arrivals
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PromoBanner;