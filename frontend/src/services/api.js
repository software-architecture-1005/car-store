import axios from '../api/axiosGlobalInstance'

// Signup
export const signup = async (userData) => {
  const response = await axios.post("api/signup/", userData);
  return response.data;
};

// Login
export const login = async (username, password) => {
  const response = await axios.post("api/token/", { username, password });
  const { access, refresh } = response.data;

  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

