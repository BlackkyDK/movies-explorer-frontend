import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import apiMovies from "../../utils/MoviesApi";
import ShowMore from "../ShowMore/ShowMore";
import { LENGTH_MIN } from "../../utils/constants";

function Movies({
  movies,
  handleMovieSave,
  handleMovieDelete,
  savedMoviesUser,
  cardsList,
}) {
  // const [query, setQuery] = React.useState("");
  const [query, setQuery] = React.useState(getSearchStoreValue());
  const [checkbox, setCheckbox] = React.useState(JSON.parse(localStorage.getItem('checkBox')) || false);

  const [initialMovies, setInitialMovies] = React.useState([]);
  const [moviesToRender, setMoviesToRender] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [isSearchMovies, setSearchMovies] = React.useState(false);
  const [searchStatus, setSearchStatus] = React.useState("");
  const [isSearchDone, setIsSearchDone] = React.useState(false);

  const [firstResultsNumber, setFirstResultsNumber] = React.useState(0);
  const [moreResultsNumber, setMoreResultsNumber] = React.useState(0);
  const currentViewport = document.documentElement.clientWidth;
  const [isMoreButtonVisible, setIsMoreButtonVisible] = React.useState(false);

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

function getSearchStoreValue() {
  const searchStoreValue = localStorage.getItem('filmSearch');
  if (!searchStoreValue) {
      return '';
  }
  return searchStoreValue;
}

  React.useEffect(() => {
    if (localStorage.getItem("searchResults")) {
      const init = JSON.parse(localStorage.getItem("searchResults"));
      const searchResult = moviesFilter(init, query, checkbox);
      setFilteredMovies(searchResult);
      setIsSearchDone(true);
    }
  }, []);

  const handleSearch = (query, checkbox) => {
    setMoviesToRender([]);
    setQuery(query);
    setCheckbox(checkbox);

    const initialMoviesInLocalStorage = JSON.parse(
      localStorage.getItem("initialMovies")
    );

    if (!initialMoviesInLocalStorage) {
      setSearchMovies(true);
      apiMovies
        .getMovies()
        .then((data) => {
          setInitialMovies(data);
          localStorage.setItem("initialMovies", JSON.stringify(data));
        })
        .catch(() => {
          setSearchStatus(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
          );
        })
        .finally(() => {
          setSearchMovies(false);
        });
    } else {
      setInitialMovies(initialMoviesInLocalStorage);
    }
  };

  React.useEffect(() => {
    if (initialMovies.length > 0) {
      const searchResults = moviesFilter(initialMovies, query, checkbox);
      setFilteredMovies(searchResults);
      setIsSearchDone(true);
      localStorage.setItem("query", query);
      localStorage.setItem("checkbox", checkbox);
      localStorage.setItem("searchResults", JSON.stringify(searchResults));
    }
  }, [initialMovies, query, checkbox]);

  React.useEffect(() => {
    if (currentViewport <= 480) {
      setFirstResultsNumber(5);
      setMoreResultsNumber(2);
    } else if (currentViewport <= 768) {
      setFirstResultsNumber(8);
      setMoreResultsNumber(2);
    } else if (currentViewport > 768) {
      setFirstResultsNumber(12);
      setMoreResultsNumber(3);
    }
  }, [currentViewport]);

  React.useEffect(() => {
    if (filteredMovies.length > 0) {
      if (filteredMovies.length > firstResultsNumber) {
        setMoviesToRender(filteredMovies.slice(0, firstResultsNumber));
        setIsMoreButtonVisible(true);
      } else {
        setMoviesToRender(filteredMovies);
      }
    }
  }, [filteredMovies, firstResultsNumber]);

  function handleMoreButtonClick() {
    setMoviesToRender((state) =>
      filteredMovies.slice(0, state.length + moreResultsNumber)
    );
  }

  React.useEffect(() => {
    if (moviesToRender.length === filteredMovies.length) {
      setIsMoreButtonVisible(false);
    }
  }, [moviesToRender, filteredMovies]);
  return (
    <main className="movies">
      <SearchForm onSearchMovies={handleSearch} />
      {isSearchMovies ? (
        <Preloader />
      ) : isSearchDone ? (
        moviesToRender.length > 0 ? (
          <MoviesCardsList
            movies={moviesToRender}
            handleMovieSave={handleMovieSave}
            handleMovieDelete={handleMovieDelete}
            savedMoviesUser={savedMoviesUser}
            cardsList={cardsList}
          />
        ) : !isSearchMovies ? (
          <span className="movies__found">Ничего не найдено</span>
        ) : (
          <span className="movies__found">{searchStatus}</span>
        )
      ) : (
        ""
      )}
      <ShowMore
        isMoreButtonVisible={isMoreButtonVisible}
        onMoreButtonClick={handleMoreButtonClick}
      />
    </main>
  );
}

export default Movies;
