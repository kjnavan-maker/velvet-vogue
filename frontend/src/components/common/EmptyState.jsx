import { motion } from "framer-motion";

function EmptyState({ title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-surface mx-auto flex min-h-[280px] w-full max-w-2xl flex-col items-center justify-center px-8 py-12 text-center"
    >
      <div className="mb-4 h-16 w-16 rounded-full bg-velvet-beige" />
      <h3 className="mb-2 text-2xl font-semibold text-slate-900">{title}</h3>
      <p className="mb-6 max-w-lg text-sm text-slate-600">{description}</p>
      {action}
    </motion.div>
  );
}

export default EmptyState;