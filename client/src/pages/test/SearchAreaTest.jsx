// export default SearchArea;
import React from 'react';
import { useState } from 'react';

const SearchArea = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search using the entered search term
    // console.log('Searching for:', searchTerm);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto">
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col w-full sm:w-auto mb-2 sm:mb-0">
          <label htmlFor="search-input" className="text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Enter suburb, address, or keywords"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center">
          <span className="text-sm font-medium text-gray-700 mr-2">Filter by:</span>
          <ul className="list-none flex flex-wrap">
            <li className="mr-4 mb-2">
              <input type="checkbox" id="sale-option" name="sale-option" className="mr-2" />
              <label htmlFor="sale-option" className="text-sm font-medium text-gray-700">
                Sale
              </label>
            </li>
            <li className="mr-4 mb-2">
              <input type="checkbox" id="rent-option" name="rent-option" className="mr-2" />
              <label htmlFor="rent-option" className="text-sm font-medium text-gray-700">
                Rent
              </label>
            </li>
            <li className="mr-4 mb-2">
              <input
                type="checkbox"
                id="new-development-option"
                name="new-development-option"
                className="mr-2"
              />
              <label
                htmlFor="new-development-option"
                className="text-sm font-medium text-gray-700"
              >
                New Developments
              </label>
            </li>
          </ul>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchArea;
