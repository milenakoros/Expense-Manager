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
    const [errorMessage, setErrorMessage] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        console.log("ID wydatku:", id);
        axios
            .get("http://localhost:5000/api/user/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania kategorii:", error);
                setErrorMessage("Nie udało się pobrać kategorii.");
            });

        axios
            .get(`http://localhost:5000/api/user/expenses/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                const { title, note, price, date, category_id } = response.data;
                setTitle(title);
                setNote(note);
                setPrice(price);
                setDate(new Date(date));
                setCategoryId(category_id);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania danych wydatku:", error.response);
                setErrorMessage("Nie udało się pobrać danych wydatku.");
            });
    }, [id]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            title,
            note,
            price: parseFloat(price),
            date: date.toISOString().split("T")[0],
            categoryId,
        };
        console.log("Dane wysyłane do API:", updatedExpense);

        axios
            .put(`http://localhost:5000/api/user/expenses/${id}`, updatedExpense, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                console.log("Odpowiedź z backendu:", response.data);
                alert("Wydatek zaktualizowany pomyślnie!");
                navigate("/user/expenses");
            })
            .catch((error) => {
                console.error("Błąd podczas aktualizacji wydatku:", error.response);
                alert("Nie udało się zaktualizować wydatku.");
            });
    };

    const handleCancel = () => {
        if (window.confirm("Czy na pewno chcesz anulować?")) {
            navigate("/user/expenses");
        }
    };

    return (
        <div>
            <h1>Edytuj Wydatek</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                <input
                    type="text"
                    placeholder="Dodaj nową kategorię"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button
                    type="button"
                    className="btn-add-category"
                    onClick={handleAddCategory}
                >
                    Dodaj kategorię
                </button>
                <button type="submit">Zapisz zmiany</button>
                <button className="btn-cancel" onClick={handleCancel}>
                    Anuluj
                </button>
            </form>
        </div>
    );
};

export default UserEditExpense;
