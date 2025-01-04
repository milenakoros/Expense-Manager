import React from "react";
import { Link } from "react-router-dom";

const ExpenseItem = ({ expense, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Czy na pewno chcesz usunąć wydatek "${expense.title}"?`)) {
      onDelete(expense.id);
    }
  };

  return (
    <div className="expense-item">
      <h3>{expense.title}</h3>
      <p>{expense.body}</p>
      <p><strong>Cena:</strong> {expense.price} zł</p>
      <div className="expense-actions">
        <Link to={`/expenses/${expense.id}`} className="btn btn-details">
          Szczegóły
        </Link>
        <Link to={`/expenses/${expense.id}/edit`} className="btn btn-edit">
          Edytuj
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Usuń
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;
