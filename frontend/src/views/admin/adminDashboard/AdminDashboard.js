import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNav from "./AdminNav";
import UsersList from "../users/UsersList";
import UserDetails from "../users/UserDetails";
import "../../../styles/Admin.css";
import UserExpenses from "../users/UserExpenses";
import UserCategories from "../users/UserCategories";
import AdminEditUserExpense from "../users/AdminEditUserExpense";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNav />
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/expenses" element={<UserExpenses />} />
        <Route path="/users/:id/categories" element={<UserCategories />} />
        <Route path="/users/:userId/expenses/:expenseId/edit" element={<AdminEditUserExpense />} />
        {/* <Route path="/users/:id/categories/:categoryId/edit" element={<UserEditCategory />} /> */}
      </Routes>
    </div>
  );
};

export default AdminDashboard;
