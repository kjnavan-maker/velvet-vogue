import api from "./api";

export const createOrderRequest = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const getMyOrdersRequest = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data;
};

export const getOrderRequest = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const getAdminDashboardRequest = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

export const getAdminOrdersRequest = async () => {
  const { data } = await api.get("/admin/orders");
  return data;
};

export const updateOrderStatusRequest = async (id, payload) => {
  const { data } = await api.put(`/admin/orders/${id}/status`, payload);
  return data;
};