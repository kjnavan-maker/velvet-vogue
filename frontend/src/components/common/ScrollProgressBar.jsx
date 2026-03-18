import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] bg-gradient-to-r from-velvet-gold via-slate-900 to-velvet-gold"
    />
  );
}

export default ScrollProgressBar;