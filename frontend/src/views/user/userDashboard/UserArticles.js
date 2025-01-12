import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Articles.css";
import Swal from "sweetalert2";

const UserArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(5);

    const fetchArticles = (page) => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/articles?page=${page}&limit=${limit}`)
            .then((response) => {
                setArticles(response.data.articles || []);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            })
            .catch(() => {
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

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="articles-container">
            <h1>Artykuły</h1>
            {loading ? (
                <p>Ładowanie artykułów...</p>
            ) : articles.length > 0 ? (
                <>
                    <ul className="articles-list">
                        {articles.map((article) => (
                            <li key={article.id} className="article-item">
                                <h2>{article.title}</h2>
                                <p>{article.content}</p>
                                {article.link && (
                                    <a
                                        href={article.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="article-link"
                                    >
                                        Czytaj więcej
                                    </a>
                                )}
                                <p className="article-date">
                                    <strong>Data publikacji:</strong>{" "}
                                    {new Date(article.date).toLocaleDateString("pl-PL")}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        <button
                            className="btn-prev"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Poprzednia
                        </button>
                        <span>
                            Strona {currentPage} z {totalPages}
                        </span>
                        <button
                            className="btn-next"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Następna
                        </button>
                    </div>
                </>
            ) : (
                <p>Nie znaleziono artykułów.</p>
            )}
        </div>
    );
};

export default UserArticles;
