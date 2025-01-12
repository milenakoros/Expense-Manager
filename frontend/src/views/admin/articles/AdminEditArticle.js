import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AdminEditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/articles/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { title, content, link } = response.data;
        setTitle(title);
        setContent(content);
        setLink(link || "");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się pobrać artykułu.",
          confirmButtonText: "OK",
        });
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      Swal.fire({
        icon: "warning",
        title: "Uwaga",
        text: "Tytuł i treść są wymagane!",
        confirmButtonText: "OK",
      });
      return;
    }

    const updatedArticle = { title, content, link };

    axios
      .put(`http://localhost:5000/articles/${id}`, updatedArticle, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sukces",
          text: "Artykuł został zaktualizowany pomyślnie!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/admin/articles");
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Błąd",
          text: "Nie udało się zaktualizować artykułu.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <h1>Edytuj Artykuł</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Treść:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <label htmlFor="link">Link (opcjonalnie):</label>
        <input
          type="text"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit" className="btn-submit">
          Zapisz zmiany
        </button>
        <button type="button" className="btn-cancel" onClick={() => navigate("/admin/articles")}>
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default AdminEditArticle;
