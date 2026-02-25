import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import useFavourites from '../hooks/useFavourites';
import './Favourites.css';

export default function Favourites() {
  const { favourites, addFavourite, removeFavourite, isFavourite } = useFavourites();

  const toggleFav = (movie) => {
    isFavourite(movie.imdbID) ? removeFavourite(movie.imdbID) : addFavourite(movie);
  };

  return (
    <main className="favs-page">
      <div className="favs-container">
        <div className="favs-header">
          <h1 className="favs-title">YOUR<br /><span>FAVOURITES</span></h1>
          <p className="favs-sub">
            {favourites.length > 0
              ? `${favourites.length} film${favourites.length > 1 ? 's' : ''} saved`
              : 'No films saved yet'}
          </p>
        </div>

        {favourites.length === 0 ? (
          <div className="favs-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p>Start adding films from the search page</p>
            <Link to="/" className="favs-cta">Browse Movies →</Link>
          </div>
        ) : (
          <div className="favs-grid">
            {favourites.map((movie, i) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFav={isFavourite(movie.imdbID)}
                onFavourite={toggleFav}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
