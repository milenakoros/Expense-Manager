import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch(() => alert("Nie udało się pobrać kategorii."));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      title,
      price: parseFloat(price),
      note,
      date: date.toISOString().split("T")[0],
      categoryId,
    };
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
        <label htmlFor="note">Opis:</label>
        <textarea
          id="note"
          placeholder="Dodaj opis wydatku"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          placeholder="Podaj cenę wydatku"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
        <label htmlFor="date">Data:</label>
        <DatePicker
          selected={date}
          onChange={(selectedDate) => setDate(selectedDate)}
          dateFormat="yyyy-MM-dd"
          required
        />
        <label htmlFor="category">Kategoria:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Dodaj Wydatek</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
