import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Loader from "../components/common/Loader";
import HeroSection from "../components/home/HeroSection";
import CategoryHighlights from "../components/home/CategoryHighlights";
import PromoBanner from "../components/home/PromoBanner";
import ProductShowcase from "../components/home/ProductShowcase";
import FeaturedCollection from "../components/home/FeaturedCollection";
import TrustHighlights from "../components/home/TrustHighlights";
import NewsletterSection from "../components/home/NewsletterSection";
import { fetchProducts } from "../features/products/productSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 50 }));
  }, [dispatch]);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 8);
  const newArrivals = products.filter((product) => product.newArrival).slice(0, 8);
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 8);

  return (
    <AnimatedPage>
      <HeroSection />
      <CategoryHighlights />
      <PromoBanner />

      {loading ? (
        <div className="container-custom py-10">
          <Loader text="Loading curated collections..." />
        </div>
      ) : (
        <>
          {newArrivals.length > 0 && (
            <ProductShowcase
              eyebrow="New Arrivals"
              title="Fresh drops for the modern wardrobe"
              description="Explore the newest Velvet Vogue releases designed to deliver contemporary fashion with premium detail."
              products={newArrivals}
            />
          )}

          {bestSellers.length > 0 && (
            <ProductShowcase
              eyebrow="Best Sellers"
              title="Signature styles customers love most"
              description="Discover the most-loved pieces trusted for their clean styling, versatility, and elevated finish."
              products={bestSellers}
            />
          )}

          <FeaturedCollection />

          {featuredProducts.length > 0 && (
            <ProductShowcase
              eyebrow="Featured Edit"
              title="A premium fashion selection, handpicked"
              description="Our featured edit brings together standout pieces that define the Velvet Vogue aesthetic."
              products={featuredProducts}
            />
          )}

          {!error &&
            featuredProducts.length === 0 &&
            newArrivals.length === 0 &&
            bestSellers.length === 0 && (
              <div className="container-custom pb-16">
                <div className="card-surface p-8 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    No featured homepage products yet. Mark products as
                    <span className="mx-1 font-semibold text-slate-900">Featured</span>,
                    <span className="mx-1 font-semibold text-slate-900">New Arrival</span>, or
                    <span className="mx-1 font-semibold text-slate-900">Best Seller</span>
                    from the admin panel.
                  </p>
                </div>
              </div>
            )}

          {error && (
            <div className="container-custom pb-16">
              <div className="rounded-2xl bg-red-50 px-6 py-4 text-sm font-medium text-red-600">
                {error}
              </div>
            </div>
          )}
        </>
      )}

      <TrustHighlights />
      <NewsletterSection />
    </AnimatedPage>
  );
}

export default HomePage;