import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../../services/axiosInstance';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch(() => alert("Nie udało się pobrać kategorii."));

    axiosInstance
      .get(`http://localhost:5000/expenses/${id}`)
      .then((response) => {
        const { title, note, price, date, categoryId } = response.data;
        setTitle(title);
        setNote(note);
        setPrice(price);
        setDate(new Date(date));
        setCategoryId(categoryId);
        setLoading(false);
      })
      .catch(() => alert("Nie udało się pobrać danych wydatku."));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`http://localhost:5000/expenses/${id}`, {
        title,
        note,
        price: parseFloat(price),
        date: date.toISOString().split("T")[0],
        categoryId,
      })
      .then(() => {
        alert("Wydatek zaktualizowany pomyślnie!");
        navigate("/");
      })
      .catch(() => alert("Nie udało się zaktualizować wydatku."));
  };
  const handleAddCategory = () => {
    const newCategory = window.prompt("Podaj nazwę nowej kategorii:");
    if (newCategory) {
      axiosInstance
        .post("http://localhost:5000/categories", { name: newCategory })
        .then((response) => {
          setCategories([...categories, response.data]);
          setCategoryId(response.data.id);
          alert("Kategoria została dodana.");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            alert("Kategoria o tej nazwie już istnieje.");
          } else {
            alert("Nie udało się dodać kategorii.");
          }
        });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Czy na pewno chcesz anulować?",
      text: "Wszelkie niezapisane zmiany zostaną utracone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, anuluj",
      cancelButtonText: "Nie, wróć",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  if (loading) return <p>Ładowanie danych...</p>;

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
        <label htmlFor="note">Opis:</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddCategory} style={{ padding: '5px 10px', background: '#668d15', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Dodaj kategorię
          </button>
        </div>
        <button type="submit">Zapisz zmiany</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
          Anuluj
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
