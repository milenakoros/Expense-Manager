import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryItem from "./UserCategoryItem";
import "../../../styles/User.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reassignToCategoryId, setReassignToCategoryId] = useState("");
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
        if (error.response?.status === 400 && error.response?.data?.message.includes("Nie można usunąć")) {
          setSelectedCategory(categoryToDelete);
          setShowReassignModal(true);
        } else {
          console.error("Błąd podczas usuwania kategorii:", error.response?.data || error);
          alert("Nie udało się usunąć kategorii.");
        }
      });
  };

  const handleReassign = () => {
    axios
      .put(
        `http://localhost:5000/api/user/categories/${selectedCategory.id}/reassign`,
        { newCategoryId: reassignToCategoryId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setShowReassignModal(false);
        setCategories(categories.filter((category) => category.id !== selectedCategory.id));
        setReassignToCategoryId("");
        alert("Wydatki zostały przeniesione, a kategoria usunięta.");
      })
      .catch((error) => {
        console.error("Błąd podczas przenoszenia wydatków:", error.response?.data || error);
        alert("Nie udało się przenieść wydatków.");
      });
  };

  const handleCancelReassign = () => {
    setShowReassignModal(false);
    setSelectedCategory(null);
    setReassignToCategoryId("");
  };

  const handleAddCategory = () => {
    navigate("/user/categories/add");
  };

  if (errorMessage) {
    return <p style={{ color: "red" }}>{errorMessage}</p>;
  }

  if (categories.length === 0) {
    return <p>Brak kategorii do wyświetlenia.</p>;
  }

  return (
    <div>
      <div className="header">
        <h1>Twoje Kategorie</h1>
        <button className="btn-add" onClick={handleAddCategory}>
          Dodaj Nową Kategorię
        </button>
      </div>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onDelete={handleDelete} />
      ))}

      {showReassignModal && (
        <div className="modal">
          <h2>Kategoria jest używana</h2>
          <p>
            Wydatki przypisane do kategorii <strong>{selectedCategory?.name}</strong> muszą zostać
            przeniesione do innej kategorii.
          </p>
          <label htmlFor="reassignCategory">Wybierz nową kategorię:</label>
          <select
            id="reassignCategory"
            value={reassignToCategoryId}
            onChange={(e) => setReassignToCategoryId(e.target.value)}
          >
            <option value="">-- Wybierz kategorię --</option>
            {categories
              .filter((category) => category.id !== selectedCategory?.id)
              .map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
          <div className="modal-actions">
            <button onClick={handleReassign} disabled={!reassignToCategoryId}>
              Przenieś wydatki
            </button>
            <button onClick={handleCancelReassign}>Anuluj</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
