import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/expenses/${id}`)
      .then((response) => {
        const { title, body, price } = response.data;
        setTitle(title);
        setBody(body);
        setPrice(price);
        setLoading(false);
      })
      .catch((error) => {
        setError("Nie udało się pobrać danych wydatku.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/expenses/${id}`, { title, body, price })
      .then(() => {
        alert("Wydatek zaktualizowany pomyślnie!");
        navigate(`/expenses/${id}`); 
      })
      .catch((error) => alert("Nie udało się zaktualizować wydatku."));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Czy na pewno chcesz anulować? Niezapisane zmiany zostaną utracone."
    );
    if (confirmCancel) {
      navigate(-1); 
    }
  };

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edytuj Wydatek</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
        <button type="submit">Zapisz zmiany</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
            Anuluj
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
