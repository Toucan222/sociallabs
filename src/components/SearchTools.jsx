import React, { useState } from 'react';
import './SearchToolsStyles.scss';

export default function SearchTools({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-tools-container">
      <label htmlFor="search" className="search-label">
        Search Tools
      </label>
      <input
        id="search"
        type="text"
        className="search-input"
        placeholder="Type a keyword..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
