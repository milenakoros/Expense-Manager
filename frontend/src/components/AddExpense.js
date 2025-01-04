import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { title, body, price: parseFloat(price) };
    axios
      .post("http://localhost:5000/expenses", newExpense)
      .then(() => {
        alert("Wydatek dodany pomyślnie!");
        navigate("/"); 
      })
      .catch(() => alert("Nie udało się dodać wydatku."));
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "Czy na pewno chcesz anulować? Wprowadzone dane zostaną utracone."
    );
    if (confirmCancel) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Dodaj Wydatek</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł:</label>
        <input
          type="text"
          id="title"
          placeholder="Wpisz tytuł wydatku"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          placeholder="Dodaj opis wydatku"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          placeholder="Podaj cenę wydatku"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
        <button type="submit">Dodaj Wydatek</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
            Anuluj
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
