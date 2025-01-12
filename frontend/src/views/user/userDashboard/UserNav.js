import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import LanguageSwitcher from "../../LanguageSwitcher";
import "../../../i18n";

const UserNav = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = () => {
        Swal.fire({
            icon: "success",
            title: t("wylogowano"),
            text: t("wylogowanoTekst"),
            confirmButtonText: t("ok"),
        }).then(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });
    };

    return (
        <nav>
            <LanguageSwitcher />
            <Link to="/user/articles">{t("artykuły")}</Link>
            <Link to="/user/profile">{t("profil.tytuł")}</Link>
            <Link to="/user/expenses">{t("wydatki")}</Link>
            <Link to="/user/expenses/add">{t("dodajWydatek.tytuł")}</Link>
            <Link to="/user/categories">{t("kategorie")}</Link>
            <button className="btn-logout" onClick={handleLogout}>
                {t("wyloguj")}
            </button>
        </nav>
    );
};

export default UserNav;
