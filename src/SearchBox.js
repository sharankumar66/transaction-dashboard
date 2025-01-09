import React from 'react';

const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="card">
      <div className="card-header">Search</div>
      <div className="card-body">
        <input
          type="text"
          placeholder="Search transactions"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
