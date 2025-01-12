import axiosInstance from './axiosInstance';

const API_URL = "http://localhost:5000/expenses";

export const getExpenses = async () => {
  const response = await axiosInstance.get(API_URL);
  return response.data;
};

export const getExpenseById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/${id}`);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axiosInstance.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axiosInstance.put(`${API_URL}/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/${id}`);
  return response.data;
};

