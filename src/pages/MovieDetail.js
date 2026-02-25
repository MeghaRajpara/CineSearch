import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import useFavourites from '../hooks/useFavourites';
import './MovieDetail.css';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const PLACEHOLDER = 'https://via.placeholder.com/400x600/111118/7a7880?text=No+Poster';

function RatingBar({ source, value }) {
  let percent = 0;
  if (value.includes('%')) percent = parseInt(value, 10);
  else if (value.includes('/100')) percent = parseInt(value, 10);
  else if (value.includes('/10')) percent = (parseFloat(value) / 10) * 100;
  return (
    <div className="rating-item">
      <span className="rating-source">{source}</span>
      <div className="rating-bar-track">
        <div className="rating-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="rating-value">{value}</span>
    </div>
  );
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res  = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await res.json();
        if (data.Response === 'True') setMovie(data);
        else setError(data.Error);
      } catch {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="detail-page"><Loader /></div>;
  if (error)   return <div className="detail-page detail-page--error"><p>{error}</p><Link to="/">← Back</Link></div>;
  if (!movie)  return null;

  const poster  = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER;
  const isFav   = isFavourite(movie.imdbID);
  const toggleFav = () => isFav ? removeFavourite(movie.imdbID) : addFavourite({
    imdbID: movie.imdbID, Title: movie.Title, Year: movie.Year, Poster: movie.Poster, Type: movie.Type
  });

  return (
    <main className="detail-page">
      {/* Backdrop */}
      <div className="detail_backdrop" style={{ backgroundImage: `url(${poster})` }} />

      <div className="detail_container">
        {/* Back */}
        <Link to="/" className="detail_back">← Back to Search</Link>

        <div className="detail_layout">
          {/* Poster */}
          <div className="detail_poster-col">
            <img src={poster} alt={movie.Title} className="detail_poster"
              onError={(e) => { e.target.src = PLACEHOLDER; }} />
            <button className={`detail_fav-btn ${isFav ? 'detail_fav-btn--active' : ''}`} onClick={toggleFav}>
              <svg viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {isFav ? 'Saved' : 'Add to Favourites'}
            </button>
          </div>

          {/* Info */}
          <div className="detail_info-col">
            <div className="detail_badges">
              <span className="badge">{movie.Type}</span>
              {movie.Rated && movie.Rated !== 'N/A' && <span className="badge">{movie.Rated}</span>}
            </div>
            <h1 className="detail_title">{movie.Title}</h1>
            <p className="detail_tagline">{movie.Year} • {movie.Runtime} • {movie.Genre}</p>

            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="detail_imdb">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
                <span>{movie.imdbRating}/10</span>
                {movie.imdbVotes !== 'N/A' && <span className="detail_votes">({movie.imdbVotes} votes)</span>}
              </div>
            )}

            <p className="detail_plot">{movie.Plot}</p>

            <div className="detail_meta-grid">
              {[
                { label: 'Director', value: movie.Director },
                { label: 'Writer',   value: movie.Writer   },
                { label: 'Cast',     value: movie.Actors   },
                { label: 'Country',  value: movie.Country  },
                { label: 'Language', value: movie.Language },
                { label: 'Awards',   value: movie.Awards   },
                { label: 'Box Office', value: movie.BoxOffice },
              ].filter(({ value }) => value && value !== 'N/A').map(({ label, value }) => (
                <div key={label} className="detail_meta-item">
                  <span className="detail_meta-label">{label}</span>
                  <span className="detail_meta-value">{value}</span>
                </div>
              ))}
            </div>

            {movie.Ratings?.length > 0 && (
              <div className="detail_ratings">
                <h3 className="detail_ratings-title">Ratings</h3>
                {movie.Ratings.map((r) => (
                  <RatingBar key={r.Source} source={r.Source} value={r.Value} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
