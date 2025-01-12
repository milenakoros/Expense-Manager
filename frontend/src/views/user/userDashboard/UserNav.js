import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserNav = () => {
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
            <Link to="/">Strona główna</Link>
            <Link to="/user/articles">Artykuły</Link>
            <Link to="/user/profile">Profil</Link>
            <Link to="/user/expenses">Wydatki</Link>
            <Link to="/user/expenses/add">Dodaj Wydatek</Link>
            <Link to="/user/categories">Kategorie</Link>
            <button className="btn-logout" onClick={handleLogout}>
                Wyloguj się
            </button>
        </nav>
    );
};

export default UserNav;
