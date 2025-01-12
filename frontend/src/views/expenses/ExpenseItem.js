import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ExpenseItem = ({ expense, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: `Czy na pewno chcesz usunąć wydatek "${expense.title}"?`,
      text: "Tej operacji nie można cofnąć.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Tak, usuń",
      cancelButtonText: "Anuluj",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(expense.id);
        Swal.fire({
          icon: "success",
          title: "Usunięto",
          text: `Wydatek "${expense.title}" został pomyślnie usunięty.`,
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div className="expense-item">
      <h3>{expense.title}</h3>
      <p><strong>Opis:</strong> {expense.note || "Brak opisu"}</p>
      <p><strong>Cena:</strong> {Number(expense.price).toFixed(2)} zł</p>
      <p><strong>Kategoria:</strong> {expense.category_name}</p>
      <p><strong>Data:</strong> {new Date(expense.date).toLocaleDateString("pl-PL")}</p>
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
