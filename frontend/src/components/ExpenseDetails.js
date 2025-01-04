import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/expenses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setExpense(data);
        setLoading(false);
      })
      .catch(() => {
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
        <p><strong>Opis:</strong> {expense.body || "Brak opisu"}</p>
        <p><strong>Cena:</strong> {expense.price} zł</p>
      </div>
      <Link to="/" className="btn btn-back">Powrót</Link>
      <Link to={`/expenses/${id}/edit`} className="btn btn-edit">Edytuj</Link>
    </div>
  );
};

export default ExpenseDetails;
