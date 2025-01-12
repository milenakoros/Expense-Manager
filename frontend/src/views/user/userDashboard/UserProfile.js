import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
    const { t } = useTranslation();
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
                    title: t("profil.błąd.tytuł"),
                    text: t("profil.błąd.treść"),
                })
            );
    }, [t]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const { value: currentPassword } = await Swal.fire({
            title: t("profil.hasło.aktualne.tytuł"),
            input: "password",
            inputLabel: t("profil.hasło.aktualne.etkieta"),
            inputPlaceholder: t("profil.hasło.aktualne.podpowiedź"),
            inputAttributes: { autocapitalize: "off" },
            showCancelButton: true,
            confirmButtonText: t("przyciski.zatwierdź"),
            cancelButtonText: t("przyciski.anuluj"),
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
                title: t("profil.błąd.tytuł"),
                text: t("profil.hasło.nieprawidłowe"),
            });
            return;
        }

        const { value: formValues } = await Swal.fire({
            title: t("profil.hasło.nowe.tytuł"),
            html:
                `<input id="swal-input1" class="swal2-input" type="password" placeholder="${t(
                    "profil.hasło.nowe.podpowiedź"
                )}">` +
                `<input id="swal-input2" class="swal2-input" type="password" placeholder="${t(
                    "profil.hasło.potwierdź.podpowiedź"
                )}">` +
                `<p style="font-size: 0.9em; margin-top: 10px; color: gray;">${t(
                    "profil.hasło.wymagania"
                )}</p>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: t("przyciski.zatwierdź"),
            cancelButtonText: t("przyciski.anuluj"),
            preConfirm: () => {
                const newPassword = document.getElementById("swal-input1").value;
                const confirmPassword = document.getElementById("swal-input2").value;

                const passwordRegex =
                    /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d)(?=.*[@$!%*?&]).{8,}$/u;

                if (!newPassword || !confirmPassword) {
                    Swal.showValidationMessage(t("profil.walidacja.wymaganePola"));
                } else if (!passwordRegex.test(newPassword)) {
                    Swal.showValidationMessage(t("profil.walidacja.wymaganiaHasła"));
                } else if (newPassword !== confirmPassword) {
                    Swal.showValidationMessage(t("profil.walidacja.hasłaNiePasują"));
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
                title: t("profil.sukces.tytuł"),
                text: t("profil.hasło.zmianaSukces"),
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: t("profil.błąd.tytuł"),
                text: t("profil.hasło.zmianaBłąd"),
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
                    title: t("profil.sukces.tytuł"),
                    text: t("profil.aktualizacjaSukces"),
                })
            )
            .catch(() =>
                Swal.fire({
                    icon: "error",
                    title: t("profil.błąd.tytuł"),
                    text: t("profil.aktualizacjaBłąd"),
                })
            );
    };

    return (
        <div>
            <h1>{t("profil.tytuł")}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">{t("profil.nazwaUżytkownika")}</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email">{t("profil.adresEmail")}</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                />
                <button type="submit">{t("profil.aktualizuj")}</button>
                <button
                    type="button"
                    onClick={handlePasswordChange}
                    className="btn-change-password"
                >
                    {t("profil.zmieńHasło")}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
