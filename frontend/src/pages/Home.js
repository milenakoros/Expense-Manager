import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Plik CSS dla stylów strony głównej

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">
                    <img src="/images/Expense-manager-logo.svg" alt="Expense Manager Logo" />
                </div>
                <nav className="home-nav">
                    <Link to="/articles">Artykuły</Link>
                    <Link to="/login">Logowanie</Link>
                    <Link to="/register">Rejestracja</Link>
                </nav>
            </header>
            <main className="home-main">
                <h1 className="home-title">Expense Manager</h1>
                <button className="home-button">
                    <Link to="/articles">Przejdź do Artykułów</Link>
                </button>
            </main>
        </div>
    );
};

export default Home;
