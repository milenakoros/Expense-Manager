import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Wylogowano",
      text: "Zostałeś pomyślnie wylogowany!",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
  };

  return (
    <nav className="admin-dashboard-nav">
      <Link to="/">Strona główna</Link>
      <Link to="/admin/users">Lista użytkowników</Link>
      <Link to="/admin/articles">Lista artykułów</Link>
      <button className="btn-logout" onClick={handleLogout}>
        Wyloguj się
      </button>
    </nav>
  );
};

export default AdminNav;
