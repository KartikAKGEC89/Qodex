import React, { useState } from 'react';

function SearchInput({ onSearch, unit, setUnit }) {
  const [cityName, setCityName] = useState('');

  const handleSearch = () => {
    if (cityName) {
      onSearch(cityName); 
    }
  };

  return (
    <div className="search-input-container">
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
        className="search-input"
      />
      
      <select 
        value={unit} 
        onChange={(e) => setUnit(e.target.value)} 
        className="unit-selector"
      >
        <option value="Celsius">Celsius</option>
        <option value="Kelvin">Kelvin</option>
      </select>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchInput;