import { motion } from "framer-motion";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-velvet-gold"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
}

export default Loader;