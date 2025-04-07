import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import API_BASE_URL from "../utils/apiConfig";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/ads/search?term=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search ads..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-white border border-[#d9d9d9] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3c6e71] focus:border-transparent text-[#353535]"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c6e71] hover:text-[#284b63] transition-colors"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-lg border border-[#d9d9d9] overflow-hidden">
          {results.map((ad) => (
            <div
              key={ad._id}
              className="p-4 border-b border-[#d9d9d9] last:border-b-0 hover:bg-[#ffffff] transition-colors"
            >
              <h4 className="text-lg font-semibold text-[#353535]">
                {ad.title}
              </h4>
              <p className="text-sm text-[#353535] mt-1">
                {ad.category} - {ad.companyName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
