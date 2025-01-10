import React, { useEffect, useState } from "react";
import axios from "axios";

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
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        {expense.title} - {expense.price} zł
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserExpenseList;
