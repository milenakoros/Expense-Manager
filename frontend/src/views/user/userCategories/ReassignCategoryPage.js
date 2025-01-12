import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/axiosInstance';
import "../../../styles/User.css";
import Swal from "sweetalert2";

const ReassignCategoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [reassignToCategoryId, setReassignToCategoryId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance
            .get(`http://localhost:5000/api/user/categories/${id}/expenses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => setExpenses(response.data))
            .catch(() =>
                setErrorMessage("Nie udało się pobrać wydatków dla tej kategorii.")
            );

        axiosInstance
            .get("http://localhost:5000/api/user/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => setCategories(response.data))
            .catch(() =>
                setErrorMessage("Nie udało się pobrać listy kategorii.")
            )
            .finally(() => setLoading(false));
    }, [id]);

    const handleReassign = () => {
        axiosInstance
            .put(
                `http://localhost:5000/api/user/categories/${id}/reassign`,
                { newCategoryId: reassignToCategoryId },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            )
            .then(() => {
                Swal.fire({
                    title: "Sukces!",
                    text: "Wydatki zostały przeniesione, a kategoria usunięta.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/user/categories");
                });
            })
            .catch(() => {
                Swal.fire({
                    title: "Błąd!",
                    text: "Nie udało się przenieść wydatków.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    const handleCancel = () => {
        navigate("/user/categories");
    };

    const handleAddCategory = () => {
        navigate("/user/categories/add");
    };

    if (loading) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div className="reassign-category-page">
            <div className="header">
                <h1>Kategoria jest używana</h1>
                <button className="btn-add-category" onClick={handleAddCategory}>
                    Dodaj Nową Kategorię
                </button>
            </div>

            <p>
                Wydatki przypisane do tej kategorii muszą zostać przeniesione do innej
                kategorii.
            </p>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            {expenses.length > 0 ? (
                <>
                    <h2>Wydatki przypisane do tej kategorii:</h2>
                    <ul className="expense-list">
                        {expenses.map((expense) => (
                            <li key={expense.id} className="expense-item">
                                <strong>Nazwa:</strong> {expense.title} <br />
                                <strong>Cena:</strong> {expense.price} zł <br />
                                <strong>Data:</strong> {new Date(expense.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Brak wydatków przypisanych do tej kategorii.</p>
            )}

            <label htmlFor="reassignCategory">Wybierz nową kategorię:</label>
            <select
                id="reassignCategory"
                value={reassignToCategoryId}
                onChange={(e) => setReassignToCategoryId(e.target.value)}
            >
                <option value="">-- Wybierz kategorię --</option>
                {categories
                    .filter((category) => category.id !== parseInt(id))
                    .map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
            </select>

            <div className="actions">
                <button
                    className="btn-reassign"
                    onClick={handleReassign}
                    disabled={!reassignToCategoryId}
                >
                    Przenieś wydatki
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                    Anuluj
                </button>
            </div>
        </div>
    );
};

export default ReassignCategoryPage;
