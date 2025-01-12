import React, { useEffect, useState } from "react";
import ArticlesNav from "./ArticlesNav";
import "../../../styles/Articles.css";
import Swal from "sweetalert2";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchArticles = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/articles?page=${page}`)
      .then((response) => {
        setArticles(response.data.articles || []);
        setTotalPages(response.data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => {
        setArticles([]);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się pobrać artykułów.",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <ArticlesNav />
      <div className="articles-container">
        <h1>Artykuły o oszczędzaniu</h1>
        {loading ? (
          <p>Ładowanie artykułów...</p>
        ) : articles.length > 0 ? (
          <ul className="articles-list">
            {articles.map((article) => (
              <li key={article.id} className="article-item">
                <h2>{article.title}</h2>
                <p>{article.content}</p>
                {article.link && (
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
                    Czytaj więcej
                  </a>
                )}
                <p className="article-date">
                  <strong>Data publikacji:</strong> {new Date(article.date).toLocaleDateString("pl-PL")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nie znaleziono artykułów.</p>
        )}
        <div className="pagination">
          <button
            className="btn-prev"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Poprzednia
          </button>
          <span>
            Strona {currentPage} z {totalPages}
          </span>
          <button
            className="btn-next"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Następna
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles;
