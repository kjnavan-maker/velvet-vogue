import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}) {
  const variantClasses =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
      ? "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-slate-900 transition hover:text-velvet-gold"
      : "btn-primary";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: disabled ? 0 : -2, scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${variantClasses} ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default Button;