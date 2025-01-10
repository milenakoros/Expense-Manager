import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
    return (
        <nav>
            <Link to="/user/profile">Profil</Link>
            <Link to="/user/expenses">Wydatki</Link>
            <Link to="/user/expenses/add">Dodaj Wydatek</Link>
            <Link to="/user/categories">Kategorie</Link>
        </nav>
    );
};

export default UserNav;
