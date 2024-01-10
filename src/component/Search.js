// src/components/Search.js
import React, { useState } from 'react';

const Search = ({ places, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const filteredPlaces = places.filter(place =>
            place.name.toLowerCase().includes(query.toLowerCase())
        );
        onSearch(filteredPlaces);
    };

    return (
        <div>
            <input type="text" placeholder="Search by name" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;
