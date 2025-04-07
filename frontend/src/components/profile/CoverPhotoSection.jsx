import React, { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";

const CoverPhotoSection = ({ coverPhoto, onChange, onUpload }) => {
  const [preview, setPreview] = useState(coverPhoto);

  useEffect(() => {
    setPreview(coverPhoto);
  }, [coverPhoto]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      {preview ? (
        <img src={preview} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-[#d9d9d9] flex items-center justify-center text-white">
          No cover photo
        </div>
      )}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg shadow-md flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2 text-sm text-[#353535] hover:bg-[#284b63] hover:text-white px-3 py-1 rounded transition-colors">
          <FiCamera className="shrink-0" />
          <span>Change Cover Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
        <button
          onClick={onUpload}
          className="px-3 py-1 bg-[#284b63] text-white text-sm rounded hover:bg-[#3c6e71] transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default CoverPhotoSection;
