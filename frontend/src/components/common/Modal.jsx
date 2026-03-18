import { AnimatePresence, motion } from "framer-motion";

function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-premium"
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;