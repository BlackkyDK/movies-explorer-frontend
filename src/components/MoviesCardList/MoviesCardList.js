import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <ul className="movies-card-list">
      {props.movies.map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
          handleMovieSave={props.handleMovieSave}
          handleMovieDelete={props.handleMovieDelete}
          savedMoviesUser={props.savedMoviesUser}
          cardsList={props.cardsList}
        />
      ))}
    </ul>
  );
}

export default MoviesCardList;
