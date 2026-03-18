import { Link } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";

function NotFoundPage() {
  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <div className="card-surface p-8 md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
              404 Error
            </p>
            <h1 className="font-display text-5xl font-bold text-slate-900 md:text-6xl">
              Page not found
            </h1>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              The page you are looking for does not exist or may have been moved. Return to the homepage and continue exploring Velvet Vogue.
            </p>

            <div className="mt-8 flex justify-center">
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default NotFoundPage;