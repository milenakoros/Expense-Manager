import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserExpenses = () => {
    const { id } = useParams();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/admin/users/${id}/expenses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => setExpenses(response.data))
            .catch(() => console.error("Nie udało się pobrać wydatków."));
    }, [id]);

    return (
        <div className="list-container">
            <h1>Wydatki użytkownika</h1>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>
                        <strong>{expense.title}</strong>
                        <span>{expense.price} zł</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserExpenses;
