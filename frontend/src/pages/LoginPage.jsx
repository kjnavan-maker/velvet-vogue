import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";
import { clearAuthError, loginUser } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { authData, loading, error } = useSelector((state) => state.auth);

  const redirectPath = location.state?.from?.pathname || "/profile";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authData?.token) {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface p-6 md:p-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              Welcome Back
            </p>
            <h1 className="font-display text-4xl font-bold text-slate-900">Login to your account</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Access your profile, order history, and premium Velvet Vogue shopping experience.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input-field"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing In..." : "Login"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-slate-900 hover:text-velvet-gold">
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default LoginPage;