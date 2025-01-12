import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Articles.css";
import Swal from "sweetalert2";
import ArticlesNav from "./ArticlesNav";

const AddArticle = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");
    const [author, setAuthor] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !content || !author) {
            Swal.fire({
                icon: "warning",
                title: "Uwaga",
                text: "Tytuł, treść i autor są wymagane!",
                confirmButtonText: "OK",
            });
            return;
        }

        const newArticle = { title, content, link, author };

        axios
            .post("http://localhost:5000/articles", newArticle)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Sukces",
                    text: "Artykuł został dodany pomyślnie!",
                    confirmButtonText: "OK",
                }).then(() => navigate("/articles"));
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się dodać artykułu.",
                    confirmButtonText: "OK",
                });
            });
    };

    const handleCancel = () => navigate("/articles");

    return (
        <div>
            <ArticlesNav />
            <div className="add-article-container">
                <h1>Dodaj Artykuł</h1>
                <form onSubmit={handleSubmit} className="add-article-form">
                    <label htmlFor="title">Tytuł:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Wpisz tytuł artykułu"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="content">Treść:</label>
                    <textarea
                        id="content"
                        placeholder="Wpisz treść artykułu"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <label htmlFor="link">Link (opcjonalnie):</label>
                    <input
                        type="text"
                        id="link"
                        placeholder="Dodaj link do pełnej wersji artykułu"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        placeholder="Podaj pseudonim autora"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">
                            Dodaj Artykuł
                        </button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
