import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import useFavourites from '../hooks/useFavourites';
import './Home.css';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || 'YOUR_API_KEY_HERE';
const DEFAULT_TERMS = ['Marvel', 'Star Wars', 'Batman', 'Inception', 'Interstellar'];

export default function Home() {
  const [searchParams]                  = useSearchParams();
  const urlQuery                        = searchParams.get('q') || '';
  const [query, setQuery]               = useState(urlQuery);
  const [movies, setMovies]             = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [page, setPage]                 = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [activeType, setActiveType]     = useState('');
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  const fetchMovies = useCallback(async (searchTerm, pg = 1, type = '') => {
    if (!searchTerm) return;
    setLoading(true);
    setError('');
    try {
      const typeParam = type ? `&type=${type}` : '';
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${pg}${typeParam}`;
      const res  = await fetch(url);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(pg === 1 ? data.Search : (prev) => [...prev, ...data.Search]);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setError(data.Error || 'No movies found.');
        if (pg === 1) setMovies([]);
        setTotalResults(0);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync with URL search param
  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
      setPage(1);
      fetchMovies(urlQuery, 1, activeType);
    }
  }, [urlQuery]); // eslint-disable-line

  // Initial trending load
  useEffect(() => {
    if (!urlQuery) {
      const random = DEFAULT_TERMS[Math.floor(Math.random() * DEFAULT_TERMS.length)];
      setQuery('');
      fetchMovies(random, 1, '');
    }
  }, []); // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setPage(1);
    fetchMovies(query.trim(), 1, activeType);
  };

  const handleTypeFilter = (type) => {
    const newType = activeType === type ? '' : type;
    setActiveType(newType);
    setPage(1);
    fetchMovies(query || DEFAULT_TERMS[0], 1, newType);
  };

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchMovies(query || DEFAULT_TERMS[0], next, activeType);
  };

  const toggleFav = (movie) => {
    isFavourite(movie.imdbID) ? removeFavourite(movie.imdbID) : addFavourite(movie);
  };

  const hasMore = movies.length < totalResults;

  return (
    <main className="home">
      {/* Hero */}
      <section className="home_hero">
        <div className="home_hero-bg" />
        <h1 className="home_headline">
          DISCOVER<br /><span>GREAT FILMS</span>
        </h1>
        <p className="home_sub">Search millions of movies, series and episodes</p>
        <form className="home_searchbar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="e.g. The Dark Knight, Oppenheimer..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="home_filters">
          {['movie', 'series', 'episode'].map((t) => (
            <button
              key={t}
              className={`home_filter-btn ${activeType === t ? 'home_filter-btn--active' : ''}`}
              onClick={() => handleTypeFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="home_results">
        {totalResults > 0 && (
          <p className="home_count">
            Showing <strong>{movies.length}</strong> of <strong>{totalResults}</strong> results
          </p>
        )}

        {error && <p className="home_error">{error}</p>}

        {loading && page === 1 ? (
          <Loader />
        ) : (
          <div className="home_grid">
            {movies.map((movie, i) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFav={isFavourite(movie.imdbID)}
                onFavourite={toggleFav}
                style={{ animationDelay: `${(i % 10) * 0.05}s` }}
              />
            ))}
          </div>
        )}

        {loading && page > 1 && <Loader />}

        {!loading && hasMore && movies.length > 0 && (
          <div className="home_loadmore">
            <button className="home_loadmore-btn" onClick={handleLoadMore}>
              Load More Films
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
