import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const AdminEditUserExpense = () => {
    const { userId, expenseId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:5000/admin/users/${userId}/categories`, {
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
            .get(`http://localhost:5000/admin/users/${userId}/expenses/${expenseId}`, {
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
    }, [userId, expenseId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            title,
            note,
            price: parseFloat(price),
            date: date.toISOString().split("T")[0],
            category_id: categoryId,
        };

        axios
            .put(
                `http://localhost:5000/admin/users/${userId}/expenses/${expenseId}`,
                updatedExpense,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            )
            .then(() => {
                Swal.fire({
                    title: "Sukces!",
                    text: "Wydatek zaktualizowany pomyślnie!",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate(-1);
                });
            })
            .catch((error) => {
                console.error("Błąd podczas aktualizacji wydatku:", error.response);
                Swal.fire({
                    title: "Błąd",
                    text: "Nie udało się zaktualizować wydatku.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
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
                navigate(-1);
            }
        });
    };

    return (
        <div>
            <h1>Edytuj Wydatek Użytkownika</h1>
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
                <button type="submit" className="btn-submit">Zapisz zmiany</button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Anuluj
                </button>
            </form>
        </div>
    );
};

export default AdminEditUserExpense;
