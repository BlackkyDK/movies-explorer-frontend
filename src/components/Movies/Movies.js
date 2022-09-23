import "./Movies.css";
import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardsList from "../MoviesCardList/MoviesCardList";
import movies from "../../utils/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";
import ShowMore from "../ShowMore/ShowMore";

function Movies() {
  const [isLoading, setLoading] = useState(false);

  const handlePreloader = () => {
    setLoading(true);
  };
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardsList movies={movies} />
      {isLoading ? (
        <Preloader />
      ) : (
        <ShowMore handlePreloader={handlePreloader} />
      )}
    </main>
  );
}

export default Movies;
