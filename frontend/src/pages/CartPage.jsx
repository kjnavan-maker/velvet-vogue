import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import formatCurrency from "../utils/formatCurrency";
import { removeFromCart, updateCartQuantity } from "../features/cart/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingFee } = useSelector((state) => state.cart);
  const { authData } = useSelector((state) => state.auth);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (cartItems.length > 0 ? shippingFee : 0);

  const handleCheckout = () => {
    if (!authData?.token) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }

    navigate("/checkout");
  };

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
            Shopping Cart
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            Review your selected pieces
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Start building your next premium look by exploring Velvet Vogue collections."
            action={
              <Link to="/shop">
                <Button>Go to Shop</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.cartKey}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="card-surface flex flex-col gap-5 p-5 sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full rounded-[1.5rem] object-cover sm:w-32"
                  />

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                        <p className="mt-2 text-sm text-slate-600">
                          Size: {item.size || "N/A"} • Color: {item.color || "N/A"}
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                          {formatCurrency(item.price)}
                        </p>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.cartKey))}
                        className="text-sm font-medium text-red-500 transition hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              cartKey: item.cartKey,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="rounded-full px-4 py-2 text-lg"
                      >
                        −
                      </button>
                      <span className="min-w-12 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              cartKey: item.cartKey,
                              quantity: Math.min(item.stock || 1, item.quantity + 1),
                            })
                          )
                        }
                        className="rounded-full px-4 py-2 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="card-surface h-fit p-6">
              <h3 className="text-2xl font-semibold text-slate-900">Order Summary</h3>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(cartItems.length > 0 ? shippingFee : 0)}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-slate-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>

              <Link to="/shop" className="mt-4 block text-center text-sm font-medium text-slate-600 hover:text-velvet-gold">
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

export default CartPage;