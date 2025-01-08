import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserEditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/user/categories")
            .then((response) => setCategories(response.data))
            .catch(() => alert("Nie udało się pobrać kategorii."));

        axios
            .get(`http://localhost:5000/api/user/expenses/${id}`)
            .then((response) => {
                const { title, note, price, date, categoryId } = response.data;
                setTitle(title);
                setNote(note);
                setPrice(price);
                setDate(new Date(date));
                setCategoryId(categoryId);
            })
            .catch(() => alert("Nie udało się pobrać danych wydatku."));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            title,
            note,
            price: parseFloat(price),
            date: date.toISOString().split("T")[0],
            categoryId,
        };
        axios
            .put(`http://localhost:5000/api/user/expenses/${id}`, updatedExpense)
            .then(() => {
                alert("Wydatek zaktualizowany pomyślnie!");
                navigate("/user/expenses");
            })
            .catch(() => alert("Nie udało się zaktualizować wydatku."));
    };

    const handleCancel = () => {
        if (window.confirm("Czy na pewno chcesz anulować?")) {
            navigate("/user/expenses");
        }
    };

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
                <button type="submit">Zapisz zmiany</button>
                <button type="button" onClick={handleCancel}>
                    Anuluj
                </button>
            </form>
        </div>
    );
};

export default UserEditExpense;
