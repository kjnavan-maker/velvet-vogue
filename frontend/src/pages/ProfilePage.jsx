import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { fetchProfile, updateProfile } from "../features/auth/authSlice";

const initialState = {
  name: "",
  email: "",
  password: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        password: "",
        street: profile.address?.street || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        postalCode: profile.address?.postalCode || "",
        country: profile.address?.country || "",
      });
    }
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess("");

    const resultAction = await dispatch(
      updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      })
    );

    if (updateProfile.fulfilled.match(resultAction)) {
      setSuccess("Profile updated successfully.");
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  if (loading && !profile) {
    return (
      <AnimatedPage className="section-padding">
        <div className="container-custom">
          <Loader text="Loading your profile..." />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="card-surface p-6 md:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              My Profile
            </p>
            <h1 className="font-display text-4xl font-bold text-slate-900">Manage your account</h1>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Full Name</label>
                <input
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">New Password (optional)</label>
                <input
                  name="password"
                  type="password"
                  className="input-field"
                  placeholder="Leave blank to keep existing password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Street Address</label>
                <input
                  name="street"
                  className="input-field"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">City</label>
                <input
                  name="city"
                  className="input-field"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">State</label>
                <input
                  name="state"
                  className="input-field"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Postal Code</label>
                <input
                  name="postalCode"
                  className="input-field"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Country</label>
                <input
                  name="country"
                  className="input-field"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              {(error || success) && (
                <div className="md:col-span-2">
                  <p
                    className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                      error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                    }`}
                  >
                    {error || success}
                  </p>
                </div>
              )}

              <div className="md:col-span-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ProfilePage;