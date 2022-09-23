import React from 'react';
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";

const MoviesCard = ({ movies }) => {
  const location = useLocation();

  return (
    <li className="movies-card">
      <div className="movies-card__text">
        <div className="movies-card__container">
          <h2 className="movies-card__title">{movies.title}</h2>
          {location.pathname === '/movies' && <button className='movies-card__save'></button>}
          {location.pathname === '/saved-movies' && <button className='movie-card__delete' ></button>}
        </div>
        <p className="movies-card__duration">{movies.duration}</p>
      </div>
      <img
        src={movies.image}
        alt={movies.title}
        className="movies-card__image"
      />
    </li>
  );
}

export default MoviesCard;
