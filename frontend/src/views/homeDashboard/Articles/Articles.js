import React from "react";
import "../../../styles/Articles.css";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "10 praktycznych sposobów na oszczędzanie pieniędzy",
      description: "Dowiedz się, jak oszczędzać na co dzień, nie rezygnując z komfortu życia.",
      link: "https://www.bankier.pl/wiadomosc/10-praktycznych-sposobow-na-oszczedzanie-pieniedzy-7940152.html",
    },
    {
      title: "Jak stworzyć skuteczny budżet domowy?",
      description: "Poradnik krok po kroku, jak zarządzać swoimi finansami.",
      link: "https://finanseosobiste.pl/artykuly/jak-stworzyc-skuteczny-budzet-domowy.html",
    },
    {
      title: "5 aplikacji do zarządzania budżetem",
      description: "Najlepsze aplikacje do śledzenia wydatków i planowania oszczędności.",
      link: "https://geek.justjoin.it/5-najlepszych-aplikacji-do-zarzadzania-budzetem-domowym/",
    },
    {
      title: "Minimalizm a oszczędzanie – jak mniej znaczy więcej?",
      description: "Dowiedz się, jak filozofia minimalizmu może pomóc w oszczędzaniu pieniędzy.",
      link: "https://blog.wyborcza.pl/2020/02/15/minimalizm-a-oszczedzanie-jak-mniej-znaczy-wiecej/",
    },
  ];

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="articles-container">
      <h1>Artykuły o oszczędzaniu</h1>
      <ul className="articles-list">
        {articles.map((article, index) => (
          <li key={index} className="article-item">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
              Czytaj więcej
            </a>
          </li>
        ))}
      </ul>
      <button className="back-to-home" onClick={handleBackToHome}>
        Powrót na stronę główną
      </button>
    </div>
  );
};

export default Articles;
