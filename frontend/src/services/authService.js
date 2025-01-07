import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const register = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};
