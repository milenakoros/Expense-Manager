import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/Articles.css";

const ArticlesNav = () => {
    return (
        <nav className="articles-nav">
            <Link to="/" className="nav-button">
                Powrót na stronę główną
            </Link>
            <Link to="/articles" className="nav-button">
                Wyświetl artykuły
            </Link>
            <Link to="/add-article" className="nav-button">
                Dodaj artykuł
            </Link>
        </nav>
    );
};

export default ArticlesNav;
