import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState({ username: "", email: "" });
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/user/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => {
                setUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
            })
            .catch(() => alert("Nie udało się załadować profilu użytkownika."));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(
                "http://localhost:5000/api/user/profile",
                { username, email },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then(() => alert("Dane zaktualizowane pomyślnie!"))
            .catch(() => alert("Nie udało się zaktualizować danych użytkownika."));
    };

    return (
        <div>
            <h1>Twój Profil</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nazwa użytkownika:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email">Adres e-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                />
                <button type="submit">Zaktualizuj</button>
            </form>
        </div>
    );
};

export default UserProfile;
