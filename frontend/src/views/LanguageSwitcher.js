import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSwitcher.css";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-switcher">
            <button
                className="lang-button flag-pl"
                onClick={() => changeLanguage("pl")}
                aria-label="Switch to Polish"
            />
            <button
                className="lang-button flag-en"
                onClick={() => changeLanguage("en")}
                aria-label="Switch to English"
            />
        </div>
    );
};

export default LanguageSwitcher;
