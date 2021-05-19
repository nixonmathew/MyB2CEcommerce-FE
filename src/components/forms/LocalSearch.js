import React from 'react';

const LocalSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <input type="search" className="mb-4 form-control" value={searchTerm}
            placeholder="Filter Categories"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
    )
}

export default LocalSearch;