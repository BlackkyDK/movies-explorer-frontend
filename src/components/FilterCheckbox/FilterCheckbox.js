import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
      <label htmlFor="shorties" className="filter">
        <input
          id="shorties"
          name="filter"
          className="filter__checkbox"
          type="checkbox" />
        <span className="filter__pseudo-checkbox"></span>
        <span className="filter__label">Короткометражки</span>
      </label>
  );
}

export default FilterCheckbox;
