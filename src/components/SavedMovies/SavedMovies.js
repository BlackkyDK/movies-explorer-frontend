import React from "react";
import "./SavedMovies.css";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { LENGTH_MIN } from "../../utils/constants";

function SavedMovies({ cardsList, handleMovieDelete }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isSearchDone, setIsSearchDone] = React.useState(false);
  // const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [query, setQuery] = React.useState(getSearchStoreValue());
  const [checkbox, setCheckbox] = React.useState(JSON.parse(localStorage.getItem('checkBox')) || false);
  function moviesFilter(movies, query, checkbox) {
    let moviesFilter = movies;
    let result;

    if (checkbox) {
      moviesFilter = moviesFilter.filter((movie) => movie.duration <= LENGTH_MIN);
    }

    result = moviesFilter.filter((movie) => {
      return movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return result;
  }

  function handleSearch(query, checkbox) {
    // setMoviesToRender([]);
    setQuery(query);
    setCheckbox(checkbox);
    const searchResult = moviesFilter(cardsList, query, checkbox);
    setFilteredMovies(searchResult);
    setIsSearchDone(true);
  }

  function getSearchStoreValue() {
    const searchStoreValue = localStorage.getItem('filmSearch');
    if (!searchStoreValue) {
        return '';
    }
    return searchStoreValue;
}

  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      const searchResult = moviesFilter(cardsList, query, checkbox);
      setFilteredMovies(searchResult);
    }
  }, [cardsList]);

  // React.useEffect(() => {
  //   if (filteredMovies) {
  //     setQuery(filteredMovies.query);
  //     moviesFilter(filteredMovies.moviesFilter);
  //   }
  // }, [filteredMovies]);
  return (
    <div className="saved-movies">
      <SearchForm onSearchMovies={handleSearch}
      checkbox={checkbox}
      query={query}
      setQuery={setQuery}
      />
      {isSearchDone ? (
        filteredMovies.length > 0 ? (
          <MoviesCardList
            movies={filteredMovies}
            handleMovieDelete={handleMovieDelete}
          />
        ) : (
          <p className="saved-movies__text">Ничего не найдено</p>
        )
      ) : (
        <MoviesCardList
          movies={cardsList}
          handleMovieDelete={handleMovieDelete}
        />
      )}
    </div>
  );
}

export default SavedMovies;
