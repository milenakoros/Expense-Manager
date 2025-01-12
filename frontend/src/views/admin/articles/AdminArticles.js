import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminArticles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/articles", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => setArticles(response.data))
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się pobrać listy artykułów.",
                    confirmButtonText: "OK",
                });
            });
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
                        setArticles(articles.filter((article) => article.id !== id));
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

    return (
        <div className="admin-articles-container">
            <h1>Lista artykułów</h1>
            {articles.length > 0 ? (
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
                                    <button className="btn-edit" onClick={() => handleEdit(article.id)}>
                                        Edytuj
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(article.id)}>
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Brak artykułów do wyświetlenia.</p>
            )}
        </div>
    );
};

export default AdminArticles;
