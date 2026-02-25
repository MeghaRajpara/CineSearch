import { useState, useEffect } from 'react';

const KEY = 'cinesearch_favourites';

export default function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie) => {
    setFavourites((prev) =>
      prev.find((m) => m.imdbID === movie.imdbID) ? prev : [...prev, movie]
    );
  };

  const removeFavourite = (imdbID) => {
    setFavourites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  const isFavourite = (imdbID) => favourites.some((m) => m.imdbID === imdbID);

  return { favourites, addFavourite, removeFavourite, isFavourite };
}
