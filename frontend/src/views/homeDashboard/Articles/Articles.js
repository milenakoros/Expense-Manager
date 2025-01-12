import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Articles.css";
import Swal from "sweetalert2";

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się pobrać artykułów.",
          confirmButtonText: "OK",
        });
      });
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleAddArticle = () => {
    navigate("/add-article");
  };

  return (
    <div className="articles-container">
      <h1>Artykuły o oszczędzaniu</h1>
      <button className="back-to-home" onClick={handleBackToHome}>
        Powrót na stronę główną
      </button>
      <ul className="articles-list">
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="article-item">
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              {article.link && (
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
                  Czytaj więcej
                </a>
              )}
            </li>
          ))
        ) : (
          <p>Nie znaleziono artykułów.</p>
        )}
      </ul>
      <div className="articles-buttons">
        <button className="add-article" onClick={handleAddArticle}>
          Dodaj artykuł
        </button>
      </div>
    </div>
  );
};

export default Articles;
