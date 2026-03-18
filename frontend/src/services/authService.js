import api from "./api";

export const loginUserRequest = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const registerUserRequest = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const getProfileRequest = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const updateProfileRequest = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data;
};

export const getCurrentUserRequest = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};