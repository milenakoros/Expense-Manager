import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">
                    <img src="/images/Expense-manager-logo.svg" alt="Expense Manager Logo" />
                </div>
                <nav className="home-nav">
                    <Link to="/login">Logowanie</Link>
                    <Link to="/register">Rejestracja</Link>
                </nav>
            </header>
            <main className="home-main">
                <h1 className="home-title home-title-top">Expense</h1>
                <h1 className="home-title home-title-bottom">Manager</h1>
                <Link to="/articles" className="home-button">
                    Przejdź do Artykułów
                </Link>
            </main>
        </div>
    );
};

export default Home;
