import axios from '../api/axiosGlobalInstance';

export async function login({ username, password }) {
  const url = `api/token/`; // URL relativa a la baseURL de axiosGlobalInstance
  const { data } = await axios.post(url, { username, password });
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return null;
  const url = `api/token/refresh/`;
  const { data } = await axios.post(url, { refresh });
  localStorage.setItem('accessToken', data.access);
  return data;
}

export async function signup({ username, email, password }) {
  const url = `api/signup/`;
  const { data } = await axios.post(url, { username, email, password });
  return data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('accessToken'));
}


