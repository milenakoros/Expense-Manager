import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserExpenses = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/admin/users/${id}/expenses`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                setExpenses(response.data)
            })
            .catch(() => console.error("Nie udało się pobrać wydatków."));
    }, [id]);

    const handleEdit = (expenseId) => {
        navigate(`/admin/users/${id}/expenses/${expenseId}/edit`);
    };

    const handleDelete = (expenseId) => {
        Swal.fire({
            title: "Czy na pewno chcesz usunąć wydatek?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Tak, usuń",
            cancelButtonText: "Anuluj",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/admin/users/${id}/expenses/${expenseId}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    })
                    .then(() => {
                        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
                        Swal.fire("Usunięto!", "Wydatek został usunięty.", "success");
                    })
                    .catch((error) => {
                        Swal.fire("Błąd", "Nie udało się usunąć wydatku.", "error");
                    });
            }
        });
    };

    return (
        <div className="list-container">
            <h1>Wydatki użytkownika</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Cena</th>
                        <th>Data</th>
                        <th>Kategoria</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.title}</td>
                            <td>{parseFloat(expense.price).toFixed(2)} zł</td>
                            <td>{new Date(expense.date).toLocaleDateString("pl-PL")}</td>
                            <td>{expense.category_name || "Brak kategorii"}</td>
                            <td className="action-buttons">
                                <button className="btn-edit" onClick={() => handleEdit(expense.id)}>Edytuj</button>
                                <button className="btn-delete" onClick={() => handleDelete(expense.id)}>Usuń</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserExpenses;
