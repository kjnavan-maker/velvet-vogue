import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NAV_LINKS } from "../../utils/constants";
import { logoutUser } from "../../features/auth/authSlice";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? "border-b border-white/60 bg-white/80 shadow-soft backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex h-20 items-center justify-between">
            <Link to="/" className="font-display text-2xl font-bold text-slate-900">
              Velvet <span className="text-velvet-gold">Vogue</span>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive ? "text-velvet-gold" : "text-slate-700 hover:text-slate-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {authData?.user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-velvet-gold hover:text-velvet-gold lg:inline-flex"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => navigate("/cart")}
                className="relative rounded-full bg-white p-3 text-slate-900 shadow-soft transition hover:-translate-y-0.5"
              >
                <FiShoppingBag size={18} />
                <AnimatePresence>
                  {totalCartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-velvet-gold px-1 text-[10px] font-bold text-white"
                    >
                      {totalCartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {authData ? (
                <div className="hidden items-center gap-2 lg:flex">
                  <button
                    onClick={() => navigate("/profile")}
                    className="rounded-full bg-white p-3 text-slate-900 shadow-soft transition hover:-translate-y-0.5"
                  >
                    <FiUser size={18} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-300 hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-3 lg:flex">
                  <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary">
                    Join Now
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-full bg-white p-3 text-slate-900 shadow-soft lg:hidden"
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} onLogout={handleLogout} />
    </>
  );
}

export default Navbar;