import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from './views/auth/Register';
import UserDashboard from "./views/user/userDashboard/UserDashboard";
import Login from './views/auth/Login';
import Home from "./views/homeDashboard/Home";
import AdminDashboard from "./views/admin/adminDashboard/AdminDashboard";
import Articles from "./views/homeDashboard/Articles/Articles";
import AddArticle from "./views/homeDashboard/Articles/AddArticle";

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
        <Route path="/add-article" element={<AddArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
