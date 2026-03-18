import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import DashboardCard from "../../components/admin/DashboardCard";
import Loader from "../../components/common/Loader";
import formatCurrency from "../../utils/formatCurrency";
import { fetchAdminDashboard } from "../../features/orders/orderSlice";

function AdminDashboardPage() {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  if (loading && !dashboard) {
    return (
      <AdminLayout title="Admin Dashboard" subtitle="Overview of store activity and performance">
        <Loader text="Loading dashboard..." />
      </AdminLayout>
    );
  }

  const stats = dashboard?.stats || {
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
    inquiriesCount: 0,
    totalRevenue: 0,
  };

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Monitor products, orders, users, inquiries, and revenue from one place."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <DashboardCard title="Users" value={stats.usersCount} description="Registered customers and admins" />
        <DashboardCard title="Products" value={stats.productsCount} description="Live items in the catalog" />
        <DashboardCard title="Orders" value={stats.ordersCount} description="Total orders placed" />
        <DashboardCard title="Inquiries" value={stats.inquiriesCount} description="Customer support messages" />
        <DashboardCard title="Revenue" value={formatCurrency(stats.totalRevenue)} description="Total order value" />
      </div>

      <div className="mt-8 admin-surface p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Recent Orders</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="px-3 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Email</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {dashboard?.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b border-slate-100">
                  <td className="px-3 py-4 font-medium text-slate-900">{order.user?.name || "Guest"}</td>
                  <td className="px-3 py-4 text-slate-600">{order.user?.email || "N/A"}</td>
                  <td className="px-3 py-4 text-slate-600">{order.orderStatus}</td>
                  <td className="px-3 py-4 font-semibold text-slate-900">{formatCurrency(order.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;