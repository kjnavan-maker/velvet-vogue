import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";
import { clearAuthError, registerUser } from "../features/auth/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (authData?.token) {
      navigate("/profile", { replace: true });
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [authData, navigate, dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!formData.name || !formData.email || !formData.password) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface p-6 md:p-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              Create Account
            </p>
            <h1 className="font-display text-4xl font-bold text-slate-900">Join Velvet Vogue</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Create your account to save orders, manage your profile, and enjoy a seamless premium fashion journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Full Name</label>
                <input
                  name="name"
                  className="input-field"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

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
                  placeholder="Enter a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="input-field"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {(localError || error) && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {localError || error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-slate-900 hover:text-velvet-gold">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default RegisterPage;