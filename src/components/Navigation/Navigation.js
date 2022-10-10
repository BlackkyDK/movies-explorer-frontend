import "./Navigation.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import iconProfile from "../../images/icon__COLOR_icon-main.svg";

const Navigation = () => {
  const [showItems, setShowItems] = useState(false);

  function handleToggleNavigation() {
    setShowItems(!showItems);
  }

  return (
    <nav className="navigation">
      <button
        className="navigation__btn-menu"
        type="button"
        onClick={handleToggleNavigation}
      ></button>
      <div
        className={`navigation__container ${
          showItems ? "navigation__container_visible" : ""
        }`}
      >
        <div className="navigation__sidebar">
          <div className="navigation__list-container">
            <button
              className="navigation__btn-close"
              type="button"
              onClick={handleToggleNavigation}
            ></button>
            <ul className="navigation__list">
              <li className="navigation__list-item navigation__list-item_type_main">
                <Link to="/" className="navigation__link">
                  Главная
                </Link>
              </li>
              <li className="navigation__list-item">
                <NavLink
                  to="/movies"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Фильмы
                </NavLink>
              </li>
              <li className="navigation__list-item">
                <NavLink
                  to="/saved-movies"
                  className="navigation__link"
                  activeClassName="navigation__link_active"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navigation__container-acc">
            <NavLink
              to="/profile"
              className="navigation__link navigation__link_type_profile"
              activeClassName="navigation__link_active"
            >
              Аккаунт
              <div className="navigation__icon">
                <img className="navigation__img" src={iconProfile} />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
