import React from "react";
import { FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";

const Gallery = ({
  images,
  galleryIndex,
  onPrev,
  onNext,
  onSelect,
  onAdd,
  onDelete,
  newFiles,
  onNewFilesChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#353535] border-b pb-2">
        Gallery
      </h2>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <label className="px-4 py-2 bg-[#d9d9d9] text-[#353535] rounded-md cursor-pointer hover:bg-[#284b63] hover:text-white transition">
            <span>Choose Images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onNewFilesChange}
              className="hidden"
            />
          </label>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[#284b63] text-white rounded-md hover:bg-[#3c6e71] transition"
          >
            Upload to Gallery
          </button>
        </div>
        {newFiles.length > 0 && (
          <p className="text-sm text-[#353535] mb-4">
            {newFiles.length} file(s) selected
          </p>
        )}
      </div>
      {images.length > 0 ? (
        <div className="mb-8">
          <div className="relative h-64 md:h-80 lg:h-96 mb-4 bg-[#d9d9d9] rounded-lg overflow-hidden">
            <img
              src={images[galleryIndex]}
              alt="Gallery"
              className="w-full h-full object-contain"
            />
            <button
              onClick={onPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`relative group cursor-pointer ${
                  idx === galleryIndex ? "ring-2 ring-[#284b63]" : ""
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => onSelect(idx)}
                  className="w-full h-20 object-cover rounded"
                />
                <button
                  onClick={() => onDelete(img)}
                  className="absolute top-1 right-1 bg-[#284b63] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#d9d9d9] h-64 rounded-lg">
          <p className="text-[#353535] mb-2">No gallery images yet</p>
          <p className="text-sm text-[#353535]">
            Upload images to showcase your business
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
