import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Articles.css";

const ArticlesNav = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    const handleAddArticle = () => {
        navigate("/add-article");
    };

    return (
        <nav className="articles-nav">
            <button className="nav-button" onClick={handleBackToHome}>
                Powrót na stronę główną
            </button>
            <button className="nav-button" onClick={handleAddArticle}>
                Dodaj artykuł
            </button>
        </nav>
    );
};

export default ArticlesNav;
