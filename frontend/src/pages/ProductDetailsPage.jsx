import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import Loader from "../components/common/Loader";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import { addToCart } from "../features/cart/cartSlice";
import { clearSingleProduct, fetchProductById } from "../features/products/productSlice";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, relatedProducts, loading } = useSelector((state) => state.products);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSingleProduct());
    };
  }, [dispatch, id]);

  const handleAddToCart = ({ quantity, size, color }) => {
    if (!product) return;

    dispatch(
      addToCart({
        cartKey: `${product._id}-${size}-${color}`,
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        quantity,
        size,
        color,
        stock: product.stock,
      })
    );

    setFeedback("Added to cart successfully.");
    setTimeout(() => setFeedback(""), 2200);
  };

  const handleBuyNow = ({ quantity, size, color }) => {
    if (!product) return;

    dispatch(
      addToCart({
        cartKey: `${product._id}-${size}-${color}`,
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        quantity,
        size,
        color,
        stock: product.stock,
      })
    );

    navigate("/cart");
  };

  if (loading || !product) {
    return (
      <AnimatedPage className="section-padding">
        <div className="container-custom">
          <Loader text="Loading product details..." />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={product.images} />
          <ProductInfo
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            feedback={feedback}
          />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </AnimatedPage>
  );
}

export default ProductDetailsPage;