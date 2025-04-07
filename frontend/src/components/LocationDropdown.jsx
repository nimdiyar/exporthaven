import React from "react";
import PropTypes from "prop-types";

const LocationDropdown = ({
  value,
  onChange,
  placeholder = "Select location",
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
      <option value="Kandy">Kandy</option>
      <option value="Matale">Matale</option>
      <option value="Nuwara Eliya">Nuwara Eliya</option>
      <option value="Ampara">Ampara</option>
      <option value="Batticaloa">Batticaloa</option>
      <option value="Trincomalee">Trincomalee</option>
      <option value="Anuradhapura">Anuradhapura</option>
      <option value="Polonnaruwa">Polonnaruwa</option>
      <option value="Jaffna">Jaffna</option>
      <option value="Kilinochchi">Kilinochchi</option>
      <option value="Mannar">Mannar</option>
      <option value="Mullaitivu">Mullaitivu</option>
      <option value="Vavuniya">Vavuniya</option>
      <option value="Kurunegala">Kurunegala</option>
      <option value="Puttalam">Puttalam</option>
      <option value="Kegalle">Kegalle</option>
      <option value="Ratnapura">Ratnapura</option>
      <option value="Galle">Galle</option>
      <option value="Hambantota">Hambantota</option>
      <option value="Matara">Matara</option>
      <option value="Badulla">Badulla</option>
      <option value="Moneragala">Moneragala</option>
      <option value="Colombo">Colombo</option>
      <option value="Gampaha">Gampaha</option>
      <option value="Kalutara">Kalutara</option>
    </select>
  );
};

LocationDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default LocationDropdown;
