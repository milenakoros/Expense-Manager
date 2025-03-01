import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserExpenseDetails = () => {
    const { id } = useParams();
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/expenses/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Błąd podczas pobierania szczegółów wydatku");
                }
                return response.json();
            })
            .then((data) => {
                setExpense(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Nie udało się pobrać szczegółów wydatku.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Ładowanie danych...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="expense-details">
            <h1>Szczegóły Wydatku</h1>
            <div className="details-box">
                <h2>{expense.title}</h2>
                <p>
                    <strong>Opis:</strong> {expense.note || "Brak opisu"}
                </p>
                <p>
                    <strong>Cena:</strong> {Number(expense.price).toFixed(2)} zł
                </p>
                <p>
                    <strong>Kategoria:</strong> {expense.category_name}
                </p>
                <p>
                    <strong>Data:</strong> {new Date(expense.date).toLocaleDateString("pl-PL")}
                </p>
            </div>
            <Link to="/user/expenses" className="btn btn-back">
                Powrót
            </Link>
            <Link to={`/user/expenses/${id}/edit`} className="btn btn-edit">
                Edytuj
            </Link>
        </div>
    );
};

export default UserExpenseDetails;
