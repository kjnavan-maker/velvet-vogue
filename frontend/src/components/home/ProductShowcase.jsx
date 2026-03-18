import SectionHeader from "../common/SectionHeader";
import ProductCard from "../product/ProductCard";

function ProductShowcase({ title, eyebrow, description, products = [] }) {
  if (!products.length) return null;

  return (
    <section className="section-padding pt-0">
      <div className="container-custom">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product._id || `${product.name}-${index}`}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;