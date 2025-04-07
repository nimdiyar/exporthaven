import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { Link } from "react-router-dom";
const ExporterListing = () => {
  const [exporters, setExporters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchExporters = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/users?role=exporter`);
        setExporters(res.data);
      } catch (error) {
        console.error("Error fetching exporters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExporters();
  }, []);
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#353535] mb-4">
            Exporter Listing
          </h2>
          <div className="w-24 h-1 bg-[#3c6e71] mx-auto mb-6"></div>
          <p className="text-lg text-[#353535] max-w-2xl mx-auto">
            Connect with trusted exporters from around the world
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-b-3 border-[#284b63]"></div>
          </div>
        ) : exporters.length === 0 ? (
          <div className="text-center py-16 bg-[#d9d9d9]/20 rounded-xl">
            <p className="text-xl text-[#353535]">No exporters found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {exporters.map((exp) => (
              <div
                key={exp._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#d9d9d9] overflow-hidden"
              >
                <div className="aspect-[4/3] w-full relative">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      exp.profilePhoto ||
                      `https://ui-avatars.com/api/?name=${
                        exp.companyName || "User"
                      }&background=284b63&color=fff&size=400`
                    }
                    alt={`${exp.companyName || "Exporter"} profile`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-semibold text-white">
                    {exp.companyName || "Unnamed Exporter"}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="h-24 overflow-hidden mb-6">
                    <p className="text-[#353535]/80 line-clamp-3">
                      {exp.bio || "No bio available."}
                    </p>
                  </div>
                  <Link
                    to={`/public-profile/${exp._id}`}
                    className="block w-full text-center py-3 px-6 bg-[#3c6e71] hover:bg-[#284b63] text-white rounded-lg transition-colors duration-300 font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ExporterListing;
