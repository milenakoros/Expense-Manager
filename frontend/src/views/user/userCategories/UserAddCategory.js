import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/axiosInstance';
import "../../../styles/User.css";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMessage("Nazwa kategorii jest wymagana!");
      return;
    }

    const newCategory = { name, description };

    axiosInstance
      .post("http://localhost:5000/api/user/categories", newCategory, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setSuccessMessage("Kategoria dodana pomyślnie!");
        navigate("/user/categories");
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania kategorii:", error);
        setErrorMessage("Nie udało się dodać kategorii.");
      });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Czy na pewno chcesz anulować?",
      text: "Wszelkie niezapisane zmiany zostaną utracone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, anuluj",
      cancelButtonText: "Nie, wróć",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/user/categories");
      }
    });
  };

  return (
    <div>
      <h1>Dodaj Kategorię</h1>
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
          Dodaj Kategorię
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
