import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNav from "./AdminNav";
import UsersList from "../users/UsersList";
import UserDetails from "../users/UserDetails";
import "../../../styles/Admin.css";
import UserExpenses from "../users/UserExpenses";
import UserCategories from "../users/UserCategories";
import UserEditExpense from "../../user/userExpenses/UserEditExpense";
import UserEditCategory from "../../user/userCategories/UserEditCategory";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNav />
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/expenses" element={<UserExpenses />} />
        <Route path="/users/:id/categories" element={<UserCategories />} />
        <Route path="/users/:id/expenses/:expenseId/edit" element={<UserEditExpense />} />
        <Route path="/users/:id/categories/:categoryId/edit" element={<UserEditCategory />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
