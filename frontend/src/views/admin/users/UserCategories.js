import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserCategories = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/users/${id}/categories`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCategories(response.data))
      .catch(() => console.error("Nie udało się pobrać kategorii."));
  }, [id]);

  return (
    <div className="list-container">
      <h1>Kategorie użytkownika</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong>
            <span>{category.description || "Brak opisu"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCategories;
