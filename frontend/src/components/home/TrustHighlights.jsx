import { motion } from "framer-motion";
import { Shield, Headphones, Truck } from "lucide-react";
import { TRUST_ITEMS } from "../../utils/constants";
import SectionHeader from "../common/SectionHeader";

function TrustHighlights() {
  const icons = {
    "Premium Quality": Shield,
    "Fast Support": Headphones,
    "Secure Checkout": Truck,
  };

  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Why Velvet Vogue"
          title="A premium experience from discovery to delivery"
          description="Every touchpoint is designed to feel smooth, intentional, and worthy of a modern fashion brand."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {TRUST_ITEMS.map((item, index) => {
            const IconComponent = icons[item.title] || Shield;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="card-surface p-6"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d4af37]/30 to-[#f5e6c8] shadow-sm">
                  <IconComponent className="h-6 w-6 text-slate-900" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustHighlights;