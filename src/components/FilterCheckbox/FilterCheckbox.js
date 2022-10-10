import './FilterCheckbox.css';

function FilterCheckbox ({handleCheckboxChange, checkboxStatus, setCheckbox}) {
    return (
           <label className='filter'>
            <input onChange={handleCheckboxChange} className="filter__checkbox" type="checkbox" />
            <span className={!checkboxStatus ? "filter__pseudo-checkbox" : "filter__checkbox"}></span>
            <span className="filter__label">Короткометражки</span>
          </label>
    )
}

export default FilterCheckbox;
