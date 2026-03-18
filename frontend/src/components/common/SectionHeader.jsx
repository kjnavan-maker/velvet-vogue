import { motion } from "framer-motion";

function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-7 text-slate-600 ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeader;