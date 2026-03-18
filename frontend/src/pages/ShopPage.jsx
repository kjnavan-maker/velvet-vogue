import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import SkeletonCard from "../components/common/SkeletonCard";
import SectionHeader from "../components/common/SectionHeader";
import FilterSidebar from "../components/product/FilterSidebar";
import ProductCard from "../components/product/ProductCard";
import { fetchProducts } from "../features/products/productSlice";

const defaultQuery = {
  keyword: "",
  category: "",
  gender: "",
  clothingType: "",
  size: "",
  color: "",
  minPrice: "",
  maxPrice: "",
  sort: "latest",
};

function ShopPage() {
  const dispatch = useDispatch();
  const { products, filters, loading, totalProducts } = useSelector((state) => state.products);
  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = Object.fromEntries(
      Object.entries(query).filter(([, value]) => value !== "" && value !== null && value !== undefined)
    );

    dispatch(fetchProducts(params));
  }, [dispatch, query]);

  const handleFilterChange = (key, value) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setQuery(defaultQuery);
  };

  const hasActiveFilters = useMemo(
    () => Object.values(query).some((value) => value !== "" && value !== "latest"),
    [query]
  );

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Shop Velvet Vogue"
          title="Refined fashion for every expression of style"
          description="Browse premium casualwear, formalwear, and accessories with elegant filters tailored for a smooth shopping experience."
        />

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div>
            <FilterSidebar
              filters={filters}
              query={query}
              onChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-3 rounded-[2rem] bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Collection</h3>
                <p className="text-sm text-slate-600">
                  {totalProducts} product{totalProducts !== 1 ? "s" : ""} found
                </p>
              </div>

              {hasActiveFilters && (
                <Button variant="secondary" onClick={handleReset}>
                  Clear Active Filters
                </Button>
              )}
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="No products matched your filters"
                description="Try adjusting your search criteria, removing some filters, or exploring a broader category to find the right style."
                action={<Button onClick={handleReset}>Reset Filters</Button>}
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, index) => (
                  <ProductCard key={product._id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ShopPage;