import SectionHeader from "../common/SectionHeader";
import ProductCard from "./ProductCard";

function RelatedProducts({ products }) {
  if (!products?.length) return null;

  return (
    <section className="section-padding pt-10">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Complete The Look"
          title="Related styles you may also love"
          description="Explore more pieces curated to complement the product you are viewing."
        />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;