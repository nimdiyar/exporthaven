import React from "react";
import { Link } from "react-router-dom";

const AdsGrid = ({ ads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.length > 0 ? (
        ads.map((ad) => (
          <Link key={ad._id} to={`/ad/${ad._id}`} className="group block">
            <div className="h-full bg-[#ffffff] border border-[#d9d9d9] rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-52 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={
                    ad.images && ad.images.length > 0
                      ? ad.images[0]
                      : "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt={ad.title}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#3c6e71] text-[#ffffff] text-xs font-medium rounded-full">
                    {ad.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#284b63] mb-2 line-clamp-1">
                  {ad.title}
                </h3>
                <p className="text-[#353535] mb-4 line-clamp-2">
                  {ad.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="font-semibold
                   text-base text-[#353535]"
                  >
                    {ad.minPrice || ad.maxPrice
                      ? `${
                          ad.minPrice ? `$${ad.minPrice.toLocaleString()}` : ""
                        }${ad.minPrice && ad.maxPrice ? " - " : ""}${
                          ad.maxPrice ? `$${ad.maxPrice.toLocaleString()}` : ""
                        } ${ad.unit || ""}`
                      : "Price not specified"}
                  </span>
                  <span className="px-3 py-1 bg-[#284b63] text-[#ffffff] text-xs font-medium rounded-full">
                    {ad.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center text-sm text-[#353535]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{ad.location}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center py-10 text-[#353535]">
          No ads found. Try adjusting your filters or be the first to post in
          this category!
        </div>
      )}
    </div>
  );
};

export default AdsGrid;
