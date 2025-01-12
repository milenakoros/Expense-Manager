import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserCategories = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/users/${id}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCategories(response.data))
      .catch(() => console.error("Nie udało się pobrać kategorii."));
  }, [id]);

  const handleEdit = (categoryId) => {
    navigate(`/admin/users/${id}/categories/${categoryId}/edit`);
  };

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Czy na pewno chcesz usunąć kategorię?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń",
      cancelButtonText: "Anuluj",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/admin/users/${id}/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          .then(() => {
            setCategories(categories.filter((category) => category.id !== categoryId));
            Swal.fire("Usunięto!", "Kategoria została usunięta.", "success");
          })
          .catch(() => Swal.fire("Błąd", "Nie udało się usunąć kategorii.", "error"));
      }
    });
  };

  return (
    <div className="list-container">
      <h1>Kategorie użytkownika</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <div className="category-info">
              <strong>{category.name}</strong>
              <span>{category.description || "Brak opisu"}</span>
            </div>
            <div className="action-buttons">
              <button className="btn-edit" onClick={() => handleEdit(category.id)}>Edytuj</button>
              <button className="btn-delete" onClick={() => handleDelete(category.id)}>Usuń</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCategories;
