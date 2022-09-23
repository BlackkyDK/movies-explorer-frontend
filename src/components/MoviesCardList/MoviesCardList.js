import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardsList({ movies }) {
  return (
    <ul className="movies-card-list">
      {movies.map((movies) => (
        <MoviesCard key={movies.id} movies={movies} />
      ))}
    </ul>
  );
}

export default MoviesCardsList;
