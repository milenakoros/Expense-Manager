import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => console.error("Nie udało się pobrać danych użytkownika."));
  }, [id]);

  const goToExpenses = () => navigate(`/admin/users/${id}/expenses`);
  const goToCategories = () => navigate(`/admin/users/${id}/categories`);

  return (
    <div className="user-details">
      <h1>Szczegóły użytkownika</h1>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nazwa użytkownika:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Rola:</strong> {user.role}
      </p>
      <div className="actions">
        <button onClick={goToExpenses}>Zobacz wydatki</button>
        <button onClick={goToCategories}>Zobacz kategorie</button>
      </div>
    </div>
  );
};

export default UserDetails;
