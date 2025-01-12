import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../../../services/axiosInstance';
import "../../../styles/User.css";
import Swal from "sweetalert2";

const AdminEditUserCategory = () => {
    const { userId, categoryId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axiosInstance
            .get(`http://localhost:5000/admin/users/${userId}/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                const { name, description } = response.data;
                setName(name);
                setDescription(description);
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się pobrać danych kategorii.",
                    confirmButtonText: "OK",
                });
            });
    }, [userId, categoryId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            Swal.fire({
                icon: "warning",
                title: "Uwaga",
                text: "Nazwa kategorii jest wymagana!",
                confirmButtonText: "OK",
            });
            return;
        }

        const updatedCategory = { categoryId, name, description };

        axiosInstance
            .put(`http://localhost:5000/admin/users/${userId}/categories/${categoryId}`, updatedCategory, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Sukces",
                    text: "Kategoria została zaktualizowana pomyślnie!",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate(`/admin/users/${userId}/categories`);
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się zaktualizować kategorii.",
                    confirmButtonText: "OK",
                });
            });
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Czy na pewno chcesz anulować?",
            text: "Wszelkie niezapisane zmiany zostaną utracone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Tak, anuluj",
            cancelButtonText: "Nie, wróć",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/admin/users/${userId}/categories`);
            }
        });
    };

    return (
        <div>
            <h1>Edytuj Kategorię Użytkownika</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nazwa:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Wpisz nazwę kategorii"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="description">Opis:</label>
                <textarea
                    id="description"
                    placeholder="Dodaj opis kategorii (opcjonalnie)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit" className="btn-submit">
                    Zapisz zmiany
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Anuluj
                </button>
            </form>
        </div>
    );
};

export default AdminEditUserCategory;
