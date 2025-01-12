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
    <nav>
      <Link to="/admin/users">Lista użytkowników</Link>
      <button className="btn-logout" onClick={handleLogout}>
        Wyloguj się
      </button>
    </nav>
  );
};

export default AdminNav;
