import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm () {
    return (
    <form className='search-form'>
        <div className='search-form__container'>
        <input placeholder='Фильм' className='search-form__input' type="text" name="search" required />
        <button className="search-form__button"></button>
        </div>

        <FilterCheckbox />

    </form>
    )
}

export default SearchForm;
