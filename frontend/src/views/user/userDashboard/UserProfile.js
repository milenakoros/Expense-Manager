import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się załadować profilu użytkownika.",
                })
            );
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const { value: currentPassword } = await Swal.fire({
            title: "Podaj aktualne hasło",
            input: "password",
            inputLabel: "Aktualne hasło",
            inputPlaceholder: "Wpisz swoje aktualne hasło",
            inputAttributes: { autocapitalize: "off" },
            showCancelButton: true,
            confirmButtonText: "Dalej",
            cancelButtonText: "Anuluj",
        });

        if (!currentPassword) return;

        try {
            await axios.post(
                "http://localhost:5000/api/user/profile/verify-password",
                { currentPassword },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Błąd",
                text: error.response?.data?.message || "Podane hasło jest nieprawidłowe.",
            });
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: "Podaj nowe hasło",
            html:
                '<input id="swal-input1" class="swal2-input" type="password" placeholder="Nowe hasło">' +
                '<input id="swal-input2" class="swal2-input" type="password" placeholder="Potwierdź nowe hasło">' +
                '<p style="font-size: 0.9em; margin-top: 10px; color: gray;">Hasło musi zawierać: co najmniej 8 znaków, dużą i małą literę, cyfrę oraz znak specjalny.</p>',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Zmień hasło",
            cancelButtonText: "Anuluj",
            preConfirm: () => {
                const newPassword = document.getElementById("swal-input1").value;
                const confirmPassword = document.getElementById("swal-input2").value;

                const passwordRegex =
                    /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[@$!%*?&]).{8,}$/u;

                if (!newPassword || !confirmPassword) {
                    Swal.showValidationMessage("Wszystkie pola są wymagane.");
                } else if (!passwordRegex.test(newPassword)) {
                    Swal.showValidationMessage(
                        "Hasło musi mieć co najmniej 8 znaków, zawierać dużą i małą literę, cyfrę oraz znak specjalny."
                    );
                } else if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage("Hasła muszą być takie same.");
                }
                return { newPassword, confirmPassword };
            },
        });

        if (!formValues) return;

        try {
            await axios.put(
                "http://localhost:5000/api/user/profile/change-password",
                {
                    currentPassword,
                    newPassword: formValues.newPassword,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            Swal.fire({
                icon: "success",
                title: "Sukces",
                text: "Hasło zostało pomyślnie zmienione.",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Błąd",
                text: error.response?.data?.message || "Nie udało się zmienić hasła.",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(
                "http://localhost:5000/api/user/profile",
                { username, email },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then(() =>
                Swal.fire({
                    icon: "success",
                    title: "Sukces",
                    text: "Dane zaktualizowane pomyślnie!",
                })
            )
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: "Błąd",
                    text: "Nie udało się zaktualizować danych użytkownika.",
                })
            );
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
                <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="btn-change-password"
                >
                    Zmień Hasło
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
