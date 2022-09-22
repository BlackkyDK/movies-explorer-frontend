import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import icon from '../../images/find.png';

function SearchForm () {
    return (
    <form className='search-form'>
        <div className='search-form__container'>
        <input placeholder='Фильм' className='search-form__input' />
        <img src={icon} className='search-form__img'></img>
        </div>

        <FilterCheckbox />

    </form>
    )
}

export default SearchForm;
