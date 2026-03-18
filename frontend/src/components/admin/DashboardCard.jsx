import { motion } from "framer-motion";

function DashboardCard({ title, value, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="admin-surface p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velvet-gold">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </motion.div>
  );
}

export default DashboardCard;