import React, { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
      setExpenses(response.data);
      setLoading(false);
    } catch (err) {
      setError("Błąd podczas pobierania wydatków.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id));
      alert("Wydatek został usunięty.");
    } catch (error) {
      alert("Nie udało się usunąć wydatku.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista Wydatków</h1>
      {expenses.length === 0 ? (
        <p>Brak wydatków do wyświetlenia</p>
      ) : (
        expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default ExpenseList;
