import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/axiosInstance';
import CategoryItem from "./UserCategoryItem";
import "../../../styles/User.css";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
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

    axiosInstance
      .delete(`http://localhost:5000/api/user/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
        Swal.fire({
          icon: "success",
          title: "Sukces",
          text: "Kategoria została usunięta pomyślnie!",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message.includes("Nie można usunąć")
        ) {
          Swal.fire({
            icon: "warning",
            title: "Kategoria jest używana",
            text: `Do kategorii "${categoryToDelete.name}" są przypisane wydatki. Czy chcesz przejść do następnego kroku, aby przenieść wydatki do innej kategorii? Jeśli nie, anulujesz usuwanie.`,
            showCancelButton: true,
            confirmButtonText: "Przejdź dalej",
            cancelButtonText: "Anuluj",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/user/categories/${id}/reassign`);
            } else {
              Swal.fire({
                icon: "info",
                title: "Anulowano",
                text: "Usuwanie kategorii zostało anulowane.",
                confirmButtonText: "OK",
              });
            }
          });
        } else {
          console.error("Błąd podczas usuwania kategorii:", error.response?.data || error);
          Swal.fire({
            icon: "error",
            title: "Błąd",
            text: "Nie udało się usunąć kategorii.",
            confirmButtonText: "OK",
          });
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
