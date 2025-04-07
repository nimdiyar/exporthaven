import React from "react";
import PropTypes from "prop-types";

const CategoryDropdown = ({
  categories,
  value,
  onChange,
  placeholder = "Select category",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-white border border-[#d9d9d9] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3c6e71] focus:border-transparent text-[#353535] appearance-none cursor-pointer hover:border-[#3c6e71] transition-colors"
    >
      <option value="" className="text-[#353535]">
        {placeholder}
      </option>
      {categories.map((cat) => (
        <option key={cat} value={cat} className="text-[#353535]">
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
};

CategoryDropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CategoryDropdown;
