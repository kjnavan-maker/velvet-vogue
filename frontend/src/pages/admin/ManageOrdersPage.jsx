import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import Loader from "../../components/common/Loader";
import formatCurrency from "../../utils/formatCurrency";
import { ORDER_STATUSES } from "../../utils/constants";
import { changeOrderStatus, fetchAdminOrders } from "../../features/orders/orderSlice";

function ManageOrdersPage() {
  const dispatch = useDispatch();
  const { adminOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const handleStatusChange = async (id, orderStatus) => {
    await dispatch(changeOrderStatus({ id, payload: { orderStatus } }));
    dispatch(fetchAdminOrders());
  };

  return (
    <AdminLayout
      title="Manage Orders"
      subtitle="Track and update order progress from pending to delivery."
    >
      <div className="admin-surface p-6">
        {loading ? (
          <Loader text="Loading orders..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="px-3 py-3 font-medium">Customer</th>
                  <th className="px-3 py-3 font-medium">Email</th>
                  <th className="px-3 py-3 font-medium">Total</th>
                  <th className="px-3 py-3 font-medium">Payment</th>
                  <th className="px-3 py-3 font-medium">Paid</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Update</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.map((order) => (
                  <tr key={order._id} className="border-b border-slate-100">
                    <td className="px-3 py-4 font-medium text-slate-900">{order.user?.name || "N/A"}</td>
                    <td className="px-3 py-4 text-slate-600">{order.user?.email || "N/A"}</td>
                    <td className="px-3 py-4 font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</td>
                    <td className="px-3 py-4 text-slate-600">{order.paymentMethod}</td>
                    <td className="px-3 py-4 text-slate-600">{order.isPaid ? "Yes" : "No"}</td>
                    <td className="px-3 py-4 text-slate-600">{order.orderStatus}</td>
                    <td className="px-3 py-4">
                      <select
                        value={order.orderStatus}
                        onChange={(event) => handleStatusChange(order._id, event.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ManageOrdersPage;