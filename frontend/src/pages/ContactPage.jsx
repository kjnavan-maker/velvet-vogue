import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";
import { createInquiryRequest } from "../services/inquiryService";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please complete all contact form fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await createInquiryRequest(formData);
      setSuccess(response.message || "Inquiry submitted successfully.");
      setFormData(initialForm);
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Failed to submit inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-surface p-6 md:p-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              Contact Velvet Vogue
            </p>
            <h1 className="font-display text-4xl font-bold text-slate-900">We would love to hear from you</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Reach out for sizing assistance, order support, product inquiries, or partnership conversations.
            </p>

            <div className="mt-8 space-y-5 text-sm text-slate-700">
              <div className="rounded-[1.5rem] bg-velvet-cream p-5">
                <h3 className="text-base font-semibold text-slate-900">Store Contact</h3>
                <p className="mt-2">Email: support@velvetvogue.com</p>
                <p className="mt-1">Phone: +94 11 245 7788</p>
                <p className="mt-1">Location: Colombo, Sri Lanka</p>
              </div>

              <div className="rounded-[1.5rem] bg-velvet-cream p-5">
                <h3 className="text-base font-semibold text-slate-900">FAQ</h3>
                <p className="mt-2">
                  <span className="font-medium text-slate-900">Delivery:</span> Orders are processed with a standard delivery placeholder in this project build.
                </p>
                <p className="mt-2">
                  <span className="font-medium text-slate-900">Returns:</span> Return workflows can be added in future improvements.
                </p>
                <p className="mt-2">
                  <span className="font-medium text-slate-900">Custom Support:</span> Use the inquiry form for product or styling assistance.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="card-surface p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Send an Inquiry</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Name</label>
                <input
                  name="name"
                  className="input-field"
                  placeholder="Your name"
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
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Subject</label>
                <input
                  name="subject"
                  className="input-field"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Message</label>
                <textarea
                  name="message"
                  rows="6"
                  className="input-field resize-none"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

              {success && (
                <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                  {success}
                </p>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ContactPage;