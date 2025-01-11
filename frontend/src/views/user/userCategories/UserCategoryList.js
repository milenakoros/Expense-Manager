import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryItem from "./UserCategoryItem";
import "../../../styles/User.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCategories(response.data))
      .catch((error) => {
        console.error("Błąd podczas pobierania kategorii:", error);
        setErrorMessage("Nie udało się pobrać kategorii.");
      });
  }, []);

  const handleDelete = (id) => {
    const categoryToDelete = categories.find((category) => category.id === id);

    axios
      .delete(`http://localhost:5000/api/user/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
        alert("Kategoria została usunięta pomyślnie.");
      })
      .catch((error) => {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message.includes("Nie można usunąć")
        ) {
          const userConfirmed = window.confirm(
            `Do kategorii "${categoryToDelete.name}" są przypisane wydatki. Czy chcesz przejść do następnego kroku, aby przenieść wydatki do innej kategorii? Jeśli nie, anulujesz usuwanie.`
          );

          if (userConfirmed) {
            navigate(`/user/categories/${id}/reassign`);
          } else {
            alert("Usuwanie kategorii zostało anulowane.");
          }
        } else {
          console.error("Błąd podczas usuwania kategorii:", error.response?.data || error);
          alert("Nie udało się usunąć kategorii.");
        }
      });
  };

  const handleAddCategory = () => {
    navigate("/user/categories/add");
  };

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  if (categories.length === 0) {
    return (
      <div className="header">
        <h1>Twoje Kategorie</h1>
        <button className="btn-add-category" onClick={handleAddCategory}>
          Dodaj Nową Kategorię
        </button>
        <p>Brak kategorii do wyświetlenia.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>Twoje Kategorie</h1>
        <button className="btn-add-category" onClick={handleAddCategory}>
          Dodaj Nową Kategorię
        </button>
      </div>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CategoryList;
