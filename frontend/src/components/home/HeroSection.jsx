import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../common/Button";

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-custom grid min-h-[82vh] items-center gap-12 py-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-velvet-gold"
          >
            Premium Fashion Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-tight text-slate-900 md:text-6xl xl:text-7xl"
          >
            Redefine your style with timeless confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg"
          >
            Discover modern casualwear, elegant formalwear, and polished accessories designed for
            young adults who express identity through elevated fashion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link to="/shop">
              <Button>Shop Collection</Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary">Contact Us</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -left-10 top-10 hidden h-32 w-32 rounded-full bg-velvet-gold/20 blur-3xl lg:block" />
          <div className="absolute -bottom-10 right-0 hidden h-40 w-40 rounded-full bg-slate-300/30 blur-3xl lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-premium">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="Velvet Vogue fashion hero"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/85 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velvet-gold">
                New Season
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">Curated statement looks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;