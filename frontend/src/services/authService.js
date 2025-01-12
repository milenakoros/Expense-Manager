import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:5000/auth';

export const register = async (userData) => {
  return await axiosInstance.post(`${API_URL}/register`, userData);
};

export const login = async (credentials) => {
  const response = await axiosInstance.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
