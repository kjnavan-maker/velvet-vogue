import api from "./api";

export const createInquiryRequest = async (payload) => {
  const { data } = await api.post("/inquiries", payload);
  return data;
};

export const getInquiriesRequest = async () => {
  const { data } = await api.get("/inquiries");
  return data;
};