import React from 'react';
import './SearchFilter.css';

function SearchFilter({ 
  searchTerm, 
  setSearchTerm, 
  selectedType, 
  setSelectedType, 
  types 
}) {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="type-filter"
      >
        {types.map(type => (
          <option key={type} value={type}>
            {type === 'all' ? 'All Types' : type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;  // Default export