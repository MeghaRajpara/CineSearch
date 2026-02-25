import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery]       = useState('');
  const navigate                = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <NavLink to="/" className="navbar_logo">
        CINE<span>SEARCH</span>
      </NavLink>

      <form className="navbar_search" onSubmit={handleSearch}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div className="navbar_links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Discover
        </NavLink>
        <NavLink to="/favourites" className={({ isActive }) => isActive ? 'active' : ''}>
          Favourites
        </NavLink>
      </div>
    </nav>
  );
}
