import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { NAV_LINKS } from "../../utils/constants";

function MobileMenu({ menuOpen, setMenuOpen, onLogout }) {
  const { authData } = useSelector((state) => state.auth);

  return (
    <AnimatePresence>
      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-premium lg:hidden"
        >
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Velvet <span className="text-velvet-gold">Vogue</span>
            </h3>
            <button
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium"
            >
              Close
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-velvet-cream"
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-velvet-cream"
            >
              Cart
            </Link>

            {authData ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-velvet-cream"
                >
                  Profile
                </Link>

                {authData.user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-velvet-cream"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="rounded-2xl border border-red-200 px-4 py-3 text-left text-base font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-slate-800 transition hover:bg-velvet-cream"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary mt-2"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default MobileMenu;