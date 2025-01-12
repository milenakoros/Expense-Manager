import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseList from "./views/expenses/ExpenseList";
import ExpenseDetails from "./views/expenses/ExpenseDetails";
import EditExpense from "./views/expenses/EditExpense";
import AddExpense from "./views/expenses/AddExpense";
import Register from './views/auth/Register';
import UserDashboard from "./views/user/userDashboard/UserDashboard";
import Login from './views/auth/Login';
import Home from "./views/homeDashboard/Home";
import AdminDashboard from "./views/admin/adminDashboard/AdminDashboard";
import Articles from "./views/homeDashboard/Articles/Articles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        <Route path="/expenses/:id" element={<ExpenseDetails />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="/expenses" element={<ExpenseList />} />
      </Routes>
    </Router>
  );
};

export default App;
