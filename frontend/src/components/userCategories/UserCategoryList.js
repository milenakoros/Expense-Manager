import React, { useState, useEffect } from "react";
import axios from "axios";

const UserCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Pobierz kategorie użytkownika
        axios
            .get("http://localhost:5000/api/user/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                setCategories(response.data);
                setErrorMessage("");
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania kategorii:", error);
                setErrorMessage("Nie udało się pobrać kategorii.");
            });
    }, []);

    if (errorMessage) {
        return <p style={{ color: "red" }}>{errorMessage}</p>;
    }

    if (categories.length === 0) {
        return <p>Brak kategorii do wyświetlenia.</p>;
    }

    return (
        <div>
            <h1>Twoje Kategorie</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <strong>{category.name}</strong>
                        {category.description && <p>{category.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserCategoryList;
