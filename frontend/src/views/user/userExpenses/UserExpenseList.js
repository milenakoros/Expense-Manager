import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseItem from "./UserExpenseItem";

const UserExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/expenses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setExpenses(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/user/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania wydatku:", error);
        alert("Nie udało się usunąć wydatku.");
      });
  };

  if (error) {
    return <p>Błąd podczas pobierania wydatków.</p>;
  }

  if (expenses.length === 0) {
    return <p>Brak wydatków do wyświetlenia.</p>;
  }

  return (
    <div>
      <h1>Twoje Wydatki</h1>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserExpenseList;
