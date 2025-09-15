import axios from '../api/axiosGlobalInstance';

const BASE_AUTH = 'http://localhost:8000/car-store/';

export async function login({ username, password }) {
  const url = `${BASE_AUTH}api/token/`;
  const { data } = await axios.post(url, { username, password });
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
}

export async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return null;
  const url = `${BASE_AUTH}api/token/refresh/`;
  const { data } = await axios.post(url, { refresh });
  localStorage.setItem('accessToken', data.access);
  return data;
}

export async function signup({ username, email, password }) {
  const url = `${BASE_AUTH}api/signup/`;
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


