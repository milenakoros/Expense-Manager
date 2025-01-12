import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNav from "./AdminNav";
import UsersList from "../users/UsersList";
import UserDetails from "../users/UserDetails";
import "../../../styles/Admin.css";
import UserExpenses from "../users/UserExpenses";
import UserCategories from "../users/UserCategories";
import AdminEditUserExpense from "../users/AdminEditUserExpense";
import AdminEditUserCategory from "../users/AdminEditUserCategory";
import AdminEditArticle from "../articles/AdminEditArticle";
import AdminArticles from "../articles/AdminArticles";

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
        <Route path="/users/:userId/categories/:categoryId/edit" element={<AdminEditUserCategory />} />

        <Route path="/articles" element={<AdminArticles />} />
        <Route path="/articles/:id/edit" element={<AdminEditArticle />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
