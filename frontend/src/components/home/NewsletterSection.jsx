import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] bg-white px-6 py-12 shadow-soft md:px-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-velvet-gold">
              Newsletter
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
              Stay close to the next collection
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Subscribe to receive launch updates, curated edits, and exclusive fashion offers from
              Velvet Vogue.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field flex-1"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button type="submit">Subscribe</Button>
            </form>

            {success && (
              <p className="mt-4 text-sm font-medium text-green-600">
                Thank you. You are now subscribed to Velvet Vogue updates.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default NewsletterSection;