import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <main className="page-notfound">
      <div className="page-notfound__container">
        <h2 className="page-notfound__title">404</h2>
        <p className="page-notfound__subtitle">Страница не найдена</p>
      </div>
      <Link to="/" className="page-notfound__back">
        Назад
      </Link>
    </main>
  );
}

export default NotFoundPage;
