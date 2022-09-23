import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import savedMovies from "../../utils/SavedMoviesCard";

function SavedMovies() {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardsList movies={savedMovies} />
    </div>
  );
}

export default SavedMovies;
