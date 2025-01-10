import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseItem from "./UserExpenseItem";
//import ExpenseItem from "../../expenses/ExpenseItem";

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
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default UserExpenseList;
