import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white">
      <div className="container-custom grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-bold text-slate-900">
            Velvet <span className="text-velvet-gold">Vogue</span>
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Premium fashion for expressive modern lifestyles. Elegant essentials, statement pieces,
            and refined accessories crafted for confident self-expression.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
            Explore
          </h4>
          <div className="space-y-3 text-sm text-slate-600">
            <Link to="/" className="block transition hover:text-velvet-gold">
              Home
            </Link>
            <Link to="/shop" className="block transition hover:text-velvet-gold">
              Shop
            </Link>
            <Link to="/contact" className="block transition hover:text-velvet-gold">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
            Support
          </h4>
          <div className="space-y-3 text-sm text-slate-600">
            <p>Colombo, Sri Lanka</p>
            <p>support@velvetvogue.com</p>
            <p>+94 11 245 7788</p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
            Join Our World
          </h4>
          <p className="mb-4 text-sm text-slate-600">
            Get first access to new drops, private offers, and curated fashion updates.
          </p>
          <Link to="/register" className="btn-primary">
            Create Account
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-100 py-5">
        <div className="container-custom flex flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row">
          <p>© 2026 Velvet Vogue. All rights reserved.</p>
          <p>Designed for a premium modern fashion experience.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;