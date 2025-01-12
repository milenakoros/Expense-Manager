import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/User.css";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const UserAddExpense = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/user/categories", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((response) => setCategories(response.data))
            .catch((error) => {
                console.error(t("błąd.pobieranieKategorii"), error);
                setErrorMessage(t("błąd.niePobranoKategorii"));
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !categoryId) {
            setErrorMessage(t("błąd.wszystkiePolaWymagane"));
            return;
        }

        const newExpense = {
            title,
            price: parseFloat(price),
            note,
            date: date.toISOString().split("T")[0],
            categoryId,
        };

        axios
            .post("http://localhost:5000/api/user/expenses", newExpense, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then(() => {
                setSuccessMessage(t("sukces.dodanoWydatek"));
                navigate("/user/expenses");
            })
            .catch((error) => {
                console.error(t("błąd.dodawanieWydatku"), error);
                setErrorMessage(t("błąd.nieDodanoWydatku"));
            });
    };

    const handleAddCategory = () => {
        if (!newCategory) {
            setErrorMessage(t("błąd.nazwaKategoriiWymagana"));
            return;
        }

        axios
            .post(
                "http://localhost:5000/api/user/categories",
                { name: newCategory },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
            .then((response) => {
                setCategories([...categories, response.data]);
                setCategoryId(response.data.id);
                setNewCategory("");
                setSuccessMessage(t("sukces.dodanoKategorie"));
            })
            .catch((error) => {
                console.error(t("błąd.dodawanieKategorii"), error);
                setErrorMessage(t("błąd.nieDodanoKategorii"));
            });
    };

    const handleCancel = () => {
        Swal.fire({
            title: t("anuluj.tytuł"),
            text: t("anuluj.treść"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("anuluj.potwierdź"),
            cancelButtonText: t("anuluj.anuluj"),
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/user/expenses");
            }
        });
    };

    return (
        <div>
            <h1>{t("dodajWydatek.tytuł")}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">{t("dodajWydatek.tytułWydatku")}</label>
                <input
                    type="text"
                    id="title"
                    placeholder={t("dodajWydatek.wpiszTytuł")}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="note">{t("dodajWydatek.opis")}</label>
                <textarea
                    id="note"
                    placeholder={t("dodajWydatek.wpiszOpis")}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <label htmlFor="price">{t("dodajWydatek.cena")}</label>
                <input
                    type="number"
                    id="price"
                    placeholder={t("dodajWydatek.wpiszCenę")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                />
                <label htmlFor="date">{t("dodajWydatek.data")}</label>
                <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    dateFormat="yyyy-MM-dd"
                    required
                />
                <label htmlFor="category">{t("dodajWydatek.kategoria")}</label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="">{t("dodajWydatek.wybierzKategorię")}</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    className="form-input-add-category"
                    type="text"
                    placeholder={t("dodajWydatek.dodajNowąKategorię")}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                    type="button"
                    className="btn-add-category"
                    onClick={handleAddCategory}
                >
                    {t("dodajWydatek.dodajKategorię")}
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="btn-submit">
                    {t("dodajWydatek.dodajWydatek")}
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                    {t("anuluj.przycisk")}
                </button>
            </form>
        </div>
    );
};

export default UserAddExpense;
