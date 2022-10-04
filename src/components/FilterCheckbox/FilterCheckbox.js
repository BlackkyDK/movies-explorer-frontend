import React, { useEffect } from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ setCheckbox, locationMovies }) {
  function handleCheckbox(event) {
    const input = event.target.checked;
    setCheckbox(input);
    localStorage.setItem("checkbox", input);
  }

  useEffect(() => {
    if (locationMovies) {
      const localCheckbox = localStorage.getItem("checkbox");
      const localCheckboxPseudo = JSON.parse(localCheckbox);

      if (localCheckboxPseudo === null) {
        return;
      } else if (localCheckboxPseudo === true) {
        const input = document.getElementById("checkbox");
        input.checked = true;
      } else {
        const input = document.getElementById("checkbox");
        input.checked = false;
      }
    }
  }, [locationMovies]);

  return (
    <label htmlFor="shorties" className="filter">
      <input
        onChange={handleCheckbox}
        id="shorties"
        name="filter"
        className="filter__checkbox"
        type="checkbox"
      />
      <span className="filter__pseudo-checkbox"></span>
      <span className="filter__label">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
