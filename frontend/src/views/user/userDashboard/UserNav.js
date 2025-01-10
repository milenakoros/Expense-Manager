import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/User.css"

const UserNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Zostałeś wylogowany!");
        navigate("/login");
    };

    return (
        <nav>
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
