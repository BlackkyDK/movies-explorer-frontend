import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearchMovies }) {
  const [query, setQuery] = React.useState("");
  const [checkbox, setCheckbox] = React.useState(false);
  let location = useLocation();

  React.useEffect(() => {
    const value = localStorage.getItem("checkbox");
    if (location.pathname === "/movies") {
      if (localStorage.getItem("query")) {
        setQuery(localStorage.getItem("query"));
      }
      if (JSON.parse(value) === true) {
        setCheckbox(true);
      } else {
        setCheckbox(false);
      }
    }
  }, [location.pathname]);

  const handleQueryChange = (e) => {
    const input = document.getElementById("queryInput");
    input.setCustomValidity("");
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchMovies(query, checkbox);
  };

  const handleChange = (checkbox) => {
    setCheckbox(checkbox);
    onSearchMovies(query, checkbox);
  };

  const handleCheckboxChange = (e) => {
    handleChange(e.target.checked);
  };

  React.useEffect(() => {
    if (!query) {
      const input = document.getElementById("queryInput");
      input.setCustomValidity("Нужно ввести ключевое слово");
    }
  }, [query]);
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          placeholder="Фильм"
          className="search-form__input"
          id="queryInput"
          autoFocus
          value={query || ""}
          onChange={handleQueryChange}
          required
        />
        <button className="search-form__button"></button>
      </div>
      <FilterCheckbox
        handleCheckboxChange={handleCheckboxChange}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
      />
    </form>
  );
}

export default SearchForm;
