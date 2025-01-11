import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ReassignCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reassignToCategoryId, setReassignToCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/categories/${id}/expenses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setExpenses(response.data))
      .catch(() => setErrorMessage("Nie udało się pobrać wydatków dla tej kategorii."));

    axios
      .get("http://localhost:5000/api/user/categories", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCategories(response.data))
      .catch(() => setErrorMessage("Nie udało się pobrać kategorii."));
  }, [id]);

  const handleReassign = () => {
    axios
      .put(
        `http://localhost:5000/api/user/categories/${id}/reassign`,
        { newCategoryId: reassignToCategoryId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert("Wydatki zostały przeniesione, a kategoria usunięta.");
        navigate("/categories");
      })
      .catch(() => alert("Nie udało się przenieść wydatków."));
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <div>
      <h1>Kategoria jest używana</h1>
      <p>
        Wydatki przypisane do kategorii muszą zostać przeniesione do innej kategorii.
      </p>
      {expenses.length > 0 && (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>{expense.title} - {expense.price} zł</li>
          ))}
        </ul>
      )}
      <label htmlFor="reassignCategory">Wybierz nową kategorię:</label>
      <select
        id="reassignCategory"
        value={reassignToCategoryId}
        onChange={(e) => setReassignToCategoryId(e.target.value)}
      >
        <option value="">-- Wybierz kategorię --</option>
        {categories
          .filter((category) => category.id !== parseInt(id))
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
      <div>
        <button onClick={handleReassign} disabled={!reassignToCategoryId}>
          Przenieś wydatki
        </button>
        <button onClick={handleCancel}>Anuluj</button>
      </div>
    </div>
  );
};

export default ReassignCategoryPage;
