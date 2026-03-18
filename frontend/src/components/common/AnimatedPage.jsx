import { motion } from "framer-motion";

function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;