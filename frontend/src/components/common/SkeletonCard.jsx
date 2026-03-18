import { motion } from "framer-motion";

function SkeletonCard() {
  return (
    <div className="card-surface overflow-hidden">
      <motion.div
        className="h-72 bg-slate-200"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
      />
      <div className="space-y-3 p-5">
        <motion.div
          className="h-4 w-24 rounded-full bg-slate-200"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
        <motion.div
          className="h-5 w-3/4 rounded-full bg-slate-200"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
        <motion.div
          className="h-4 w-full rounded-full bg-slate-200"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
      </div>
    </div>
  );
}

export default SkeletonCard;