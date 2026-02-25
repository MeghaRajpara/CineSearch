import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader-ring" />
      <p className="loader-text">Fetching films...</p>
    </div>
  );
}
