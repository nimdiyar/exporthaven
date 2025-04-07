import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import HeroSection from "../components/ads/HeroSection";
import FiltersAndSort from "../components/ads/FiltersAndSort";
import AdsGrid from "../components/ads/AdsGrid";
import PostAdModal from "../components/ads/PostAdModal";
import SearchBar from "../components/SearchBar";

const categories = [
  "electronics",
  "machinery",
  "food",
  "textiles",
  "automotive",
  "chemicals",
  "pharmaceuticals",
  "agriculture",
  "Gems & Precious Stones",
  "Gold & Jewelry",
  "Spices & Seasonings",
  "other",
];

const ManufacturerAds = () => {
  const [ads, setAds] = useState([]);
  const [filters, setFilters] = useState({ category: "", location: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    unit: "",
    certifications: "",
  });
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    fetchAds();
  }, [filters, sortBy]);

  const fetchAds = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/ads/manufacturers?category=${filters.category}&location=${filters.location}&sort=${sortBy}`
      );
      setAds(response.data);
    } catch (error) {
      toast.error("Failed to load ads");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (files) => {
    setSelectedFiles(files);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!selectedFiles || selectedFiles.length === 0)
      newErrors.images = "At least one image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      Array.from(selectedFiles).forEach((file) => {
        data.append("images", file);
      });

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`${API_BASE_URL}/api/ads`, data, config);
      toast.success("Ad posted successfully!");
      setShowModal(false);
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        minPrice: "",
        maxPrice: "",
        unit: "",
        certifications: "",
      });
      setSelectedFiles([]);
      fetchAds();
    } catch (error) {
      toast.error(
        "Failed to post ad: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#353535]">
      <div className="container mx-auto px-4 py-8">
        <HeroSection
          title="Manufacturer Marketplace"
          subtitle="Connect with Sri Lankan manufacturers and explore export opportunities"
        />
        <div className="mb-6">
          <SearchBar />
        </div>
        <div className="bg-[#ffffff] rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <FiltersAndSort
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {user && user.role === "manufacturer" && (
              <button
                className="w-full md:w-auto px-6 py-3 bg-[#284b63] text-[#ffffff] font-medium rounded-md hover:bg-[#3c6e71] transition-colors shadow-sm"
                onClick={() => setShowModal(true)}
              >
                Post New Ad
              </button>
            )}
          </div>
          <AdsGrid ads={ads} />
        </div>
      </div>
      <PostAdModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleChange={handleChange}
        handleFilesChange={handleFilesChange}
        handleSubmit={handleSubmit}
        errors={errors}
        categories={categories}
      />
      <ToastContainer />
    </div>
  );
};

export default ManufacturerAds;
