import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpenseItem from "./UserExpenseItem";

const UserExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/expenses?page=${currentPage}&limit=5`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setExpenses(response.data.expenses);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
      })
      .catch(() => {
        console.error("Błąd podczas pobierania wydatków.");
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1>Twoje Wydatki</h1>
      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))
      ) : (
        <p>Brak wydatków do wyświetlenia.</p>
      )}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Poprzednia
        </button>
        <span>Strona {currentPage} z {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Następna
        </button>
      </div>
    </div>
  );
};

export default UserExpenseList;
