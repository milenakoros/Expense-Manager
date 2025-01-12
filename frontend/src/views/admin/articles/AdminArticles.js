import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminArticles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchArticles = (page = 1) => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/articles?page=${page}&limit=10`)
            .then((response) => {
                setArticles(response.data.articles);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.page);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania artykułów:", error);
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się pobrać listy artykułów.",
                    confirmButtonText: "OK",
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/articles/${id}/edit`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Czy na pewno chcesz usunąć ten artykuł?",
            text: "Tej operacji nie można cofnąć.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Tak, usuń",
            cancelButtonText: "Anuluj",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/articles/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    })
                    .then(() => {
                        fetchArticles(currentPage);
                        Swal.fire({
                            icon: "success",
                            title: "Usunięto!",
                            text: "Artykuł został usunięty pomyślnie.",
                            confirmButtonText: "OK",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Błąd",
                            text: "Nie udało się usunąć artykułu.",
                            confirmButtonText: "OK",
                        });
                    });
            }
        });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            fetchArticles(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            fetchArticles(currentPage - 1);
        }
    };

    return (
        <div className="admin-articles-container">
            <h1>Lista artykułów</h1>
            {loading ? (
                <p>Ładowanie artykułów...</p>
            ) : articles.length > 0 ? (
                <>
                    <table className="admin-articles-table">
                        <thead>
                            <tr>
                                <th>Tytuł</th>
                                <th>Autor</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id}>
                                    <td>{article.title}</td>
                                    <td>{article.author}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => handleEdit(article.id)}
                                        >
                                            Edytuj
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(article.id)}
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                </>
            ) : (
                <p>Brak artykułów do wyświetlenia.</p>
            )}
        </div>
    );
};

export default AdminArticles;
