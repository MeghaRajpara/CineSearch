import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const PLACEHOLDER = '';

export default function MovieCard({ movie, onFavourite, isFav, style }) {
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;

  return (
    <article className="movie-card" style={style}>
      <Link to={`/movie/${movie.imdbID}`} className="movie-card_poster-wrap">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card_poster"
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER; }}
        />
        <div className="movie-card_overlay">
          <span className="movie-card_view">View Details</span>
        </div>
        <span className="movie-card_type">{movie.Type}</span>
      </Link>

      <div className="movie-card_info">
        <Link to={`/movie/${movie.imdbID}`}>
          <h3 className="movie-card_title">{movie.Title}</h3>
        </Link>
        <div className="movie-card_meta">
          <span className="movie-card_year">{movie.Year}</span>
          <button
            className={`movie-card_fav ${isFav ? 'movie-card_fav--active' : ''}`}
            onClick={() => onFavourite(movie)}
            title={isFav ? 'Remove from favourites' : 'Add to favourites'}
          >
            <svg viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
