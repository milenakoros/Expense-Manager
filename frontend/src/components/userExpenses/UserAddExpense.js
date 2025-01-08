import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserAddExpense = () => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !categoryId) {
            setErrorMessage("Wszystkie pola są wymagane!");
            return;
        }

        const newExpense = {
            title,
            price: parseFloat(price),
            note,
            date: date.toISOString().split("T")[0],
            categoryId,
        };

        axios
            .post("http://localhost:5000/api/user/expenses", newExpense, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(() => {
                setSuccessMessage("Wydatek dodany pomyślnie!");
                navigate("/user/expenses");
            })
            .catch((error) => {
                console.error("Błąd podczas dodawania wydatku:", error);
                setErrorMessage("Nie udało się dodać wydatku.");
            });
    };

    const handleAddCategory = () => {
        if (!newCategory) {
            setErrorMessage("Nazwa kategorii jest wymagana!");
            return;
        }

        axios
            .post(
                "http://localhost:5000/api/user/categories",
                { name: newCategory },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then((response) => {
                setCategories([...categories, response.data]);
                setCategoryId(response.data.id);
                setNewCategory("");
                setSuccessMessage("Kategoria została dodana.");
            })
            .catch((error) => {
                console.error("Błąd podczas dodawania kategorii:", error);
                setErrorMessage("Nie udało się dodać kategorii.");
            });
    };

    const handleCancel = () => {
        if (window.confirm("Czy na pewno chcesz anulować?")) {
            navigate("/user/expenses");
        }
    };

    return (
        <div>
            <h1>Dodaj Wydatek</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                    <input
                        type="text"
                        placeholder="Dodaj nową kategorię"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button type="button" onClick={handleAddCategory}>
                        Dodaj kategorię
                    </button>
                </div>
                <button type="submit">Dodaj Wydatek</button>
                <button type="button" onClick={handleCancel}>
                    Anuluj
                </button>
            </form>
        </div>
    );
};

export default UserAddExpense;
