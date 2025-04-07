import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageUploader = ({ onFilesChange, maxSizeMB = 5 }) => {
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const newPreviews = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File ${file.name} exceeds the ${maxSizeMB}MB size limit.`);
        continue;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }
    setError("");
    setPreviews(newPreviews);
    onFilesChange(validFiles);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3c6e71] file:text-white hover:file:bg-[#284b63]"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex flex-wrap gap-2 mt-2">
        {previews.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="w-24 h-24 object-cover rounded border border-[#d9d9d9]"
          />
        ))}
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  onFilesChange: PropTypes.func.isRequired,
  maxSizeMB: PropTypes.number,
};

export default ImageUploader;
