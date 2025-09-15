import api from '../api/axiosInstance'

// Signup
export const signup = async (userData) => {
  const response = await api.post("/api/signup/", userData);
  return response.data;
};

// Login
export const login = async (username, password) => {
  const response = await api.post("/api/token/", { username, password });
  const { access, refresh } = response.data;

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

