import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPage from "../components/common/AnimatedPage";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import formatCurrency from "../utils/formatCurrency";
import { fetchMyOrders } from "../features/orders/orderSlice";

function MyOrdersPage() {
  const dispatch = useDispatch();
  const { myOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
            My Orders
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900">Track your order history</h1>
        </div>

        {loading ? (
          <Loader text="Loading your orders..." />
        ) : myOrders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Once you place an order, it will appear here with status and summary details."
            action={
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-5">
            {myOrders.map((order) => (
              <div key={order._id} className="card-surface p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                      {order.orderStatus}
                    </span>
                    <span className="rounded-full bg-velvet-beige px-4 py-2 text-xs font-semibold text-slate-900">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {order.orderItems.map((item) => (
                    <div key={`${order._id}-${item.product}`} className="rounded-[1.5rem] bg-velvet-cream p-4">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.size || "N/A"} • {item.color || "N/A"} • Qty {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/order-confirmation/${order._id}`}
                  className="mt-6 inline-flex text-sm font-semibold text-slate-900 hover:text-velvet-gold"
                >
                  View details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}

export default MyOrdersPage;