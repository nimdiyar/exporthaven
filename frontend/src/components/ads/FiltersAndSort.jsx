// frontend\src\components\ads\FiltersAndSort.jsx
import React from "react";
import CategoryDropdown from "../CategoryDropdown";
import LocationDropdown from "../LocationDropdown";

const FiltersAndSort = ({
  categories,
  filters,
  setFilters,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
      <CategoryDropdown
        categories={categories}
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value })}
        placeholder="All Categories"
      />
      <LocationDropdown
        value={filters.location}
        onChange={(value) => setFilters({ ...filters, location: value })}
        placeholder="Select Location"
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#284b63] text-[#353535]"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};

export default FiltersAndSort;
