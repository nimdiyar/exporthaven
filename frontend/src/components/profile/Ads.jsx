import React from "react";

const Ads = ({ ads, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#353535] border-b pb-2">
        My Ads
      </h2>
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="border border-[#d9d9d9] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-48 bg-[#d9d9d9] relative">
                <img
                  src={ad.images[0] || "/fallback-banner.png"}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
                    ad.status === "active"
                      ? "bg-green-100 text-green-800"
                      : ad.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ad.status.toUpperCase()}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#353535] mb-2">
                  {ad.title}
                </h3>
                <p className="text-[#353535] text-sm mb-4">
                  {ad.description
                    ? ad.description.substring(0, 100) +
                      (ad.description.length > 100 ? "..." : "")
                    : "No description provided"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#353535]">
                    Posted: {new Date(ad.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onDelete(ad._id)}
                    className="px-3 py-1 bg-[#284b63] text-white text-sm rounded hover:bg-[#3c6e71] transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-[#d9d9d9] h-32 rounded-lg">
          <p className="text-[#353535]">No ads found</p>
          <p className="text-sm text-[#353535]">
            Create ads to showcase your products
          </p>
        </div>
      )}
    </div>
  );
};

export default Ads;
