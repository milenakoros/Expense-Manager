import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/User.css";

const UserEditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { name, description } = response.data;
        setName(name);
        setDescription(description);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania szczegółów kategorii:", error);
        setErrorMessage("Nie udało się pobrać danych kategorii.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("Nazwa kategorii jest wymagana!");
      return;
    }

    const updatedCategory = { name, description };

    axios
      .put(`http://localhost:5000/api/user/categories/${id}`, updatedCategory, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setSuccessMessage("Kategoria zaktualizowana pomyślnie!");
        navigate("/user/categories");
      })
      .catch((error) => {
        console.error("Błąd podczas aktualizacji kategorii:", error);
        setErrorMessage("Nie udało się zaktualizować kategorii.");
      });
  };

  const handleCancel = () => {
    if (window.confirm("Czy na pewno chcesz anulować?")) {
      navigate("/user/categories");
    }
  };

  return (
    <div>
      <h1>Edytuj Kategorię</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nazwa:</label>
        <input
          type="text"
          id="name"
          placeholder="Wpisz nazwę kategorii"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          placeholder="Dodaj opis kategorii (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="btn-submit">
          Zapisz zmiany
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default UserEditCategory;
