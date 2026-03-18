import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { clearAuthError, loginUser } from "../../features/auth/authSlice";

function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authData, loading, error } = useSelector((state) => state.auth);

  const redirectPath = location.state?.from?.pathname || "/admin/dashboard";

  const [formData, setFormData] = useState({
    email: "admin@velvetvogue.com",
    password: "Admin123!",
  });
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (authData?.user?.role === "admin") {
      navigate(redirectPath, { replace: true });
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [authData, navigate, redirectPath, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.user.role !== "admin") {
        setLocalError("This account does not have admin access.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-premium md:p-8"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
          Admin Access
        </p>
        <h1 className="font-display text-4xl font-bold text-slate-900">Velvet Vogue Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Sign in to manage products, orders, inquiries, and dashboard analytics.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Admin Email</label>
            <input
              name="email"
              type="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Password</label>
            <input
              name="password"
              type="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {(localError || error) && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {localError || error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing In..." : "Login to Admin Panel"}
          </Button>
        </form>

        <Link to="/" className="mt-6 block text-center text-sm font-medium text-slate-600 hover:text-velvet-gold">
          Return to storefront
        </Link>
      </motion.div>
    </div>
  );
}

export default AdminLoginPage;