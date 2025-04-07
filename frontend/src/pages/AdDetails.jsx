import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaEdit,
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import Review from "../components/Review";

const AdDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdDetails();
  }, [id]);

  const fetchAdDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const adRes = await axios.get(`${API_BASE_URL}/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAd(adRes.data);
      setImages(adRes.data.images || []);
    } catch (error) {
      setError("Failed to load ad details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (direction) => {
    setSelectedImage((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 1) % images.length
          : (prevIndex - 1 + images.length) % images.length;
      return newIndex;
    });
  };

  const handleOrderRequest = async () => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/api/orders`,
        { adId: id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order request sent successfully!");
    } catch (error) {
      toast.error("Error sending order request. Please try again.");
    }
  };

  const handleDeleteAd = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Ad deleted successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Error deleting ad. Please try again.");
    }
  };

  const handleStatusEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const updateData = { status: newStatus };
      const res = await axios.put(`${API_BASE_URL}/api/ads/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAd(res.data);
      setIsEditingStatus(false);
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Error updating status. Please try again.");
    }
  };

  const handleSendChat = async () => {
    if (!chatMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_BASE_URL}/api/chat/send`,
        {
          adId: ad._id,
          receiverId: ad.user._id,
          senderId: user._id,
          content: chatMessage,
          type: "text",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Message sent!");
      setChatMessage("");
    } catch (error) {
      console.error("Send chat error:", error);
      toast.error("Error sending message");
    }
  };

  const showManagementButtons =
    user && ad && ad.user?._id?.toString() === user.id?.toString();
  const showOrderButton =
    user &&
    user.role === "manufacturer" &&
    ad &&
    ad.user &&
    ad.user.role === "exporter";

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-[#284b63] text-xl font-medium">
          Loading ad details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );

  if (!ad)
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-red-600 text-xl">No ad found.</div>
      </div>
    );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#353535]">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 relative">
              <div className="relative h-80 md:h-[500px]">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#d9d9d9] bg-opacity-20">
                    <span className="text-[#353535]">No image available</span>
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md text-[#284b63] transition-all"
                      onClick={() => handleImageChange("prev")}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md text-[#284b63] transition-all"
                      onClick={() => handleImageChange("next")}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex justify-center p-3 gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all ${
                        selectedImage === index
                          ? "bg-[#284b63]"
                          : "bg-[#d9d9d9]"
                      }`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* Details Section */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-[#284b63] mb-2">
                    {ad.title}
                  </h1>
                  <Link
                    to={`/public-profile/${ad.user._id}`}
                    className="text-[#3c6e71] hover:underline font-medium"
                  >
                    {ad.user.companyName || ad.user.name}
                  </Link>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    ad.status
                  )}`}
                >
                  {ad.status.toUpperCase()}
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold border-b border-[#d9d9d9] pb-2 mb-4">
                  Product Details
                </h2>
                <p className="text-[#353535] mb-4">{ad.description}</p>
                <p className="mb-3 flex items-center">
                  <span className="font-medium mr-2">Certifications:</span>
                  <span>
                    {(ad.certifications && ad.certifications.join(", ")) ||
                      "Not available"}
                  </span>
                </p>
                <p className="mb-4 text-lg">
                  <span className="font-medium">Price Range:</span>{" "}
                  <span className="text-[#284b63] font-semibold">
                    {ad.minPrice || ad.maxPrice
                      ? `${ad.minPrice ? `$${ad.minPrice}` : ""}${
                          ad.minPrice && ad.maxPrice ? " - " : ""
                        }${ad.maxPrice ? `$${ad.maxPrice}` : ""} ${
                          ad.unit || ""
                        }`
                      : "Price not specified"}
                  </span>
                </p>
                <p className="flex items-center text-[#353535] mb-4">
                  <FaMapMarkerAlt className="mr-2 text-[#3c6e71]" />{" "}
                  {ad.location}
                </p>
              </div>
              {/* Contact Details */}
              {ad.user && (
                <div className="mt-6 bg-[#f9f9f9] p-4 rounded-lg border border-[#d9d9d9]">
                  <h3 className="font-semibold text-lg mb-3 border-b border-[#d9d9d9] pb-2">
                    Contact Details
                  </h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <FaEnvelope className="mr-3 text-[#3c6e71]" />
                      <span>{ad.user.email || "No email available"}</span>
                    </p>
                    <p className="flex items-center">
                      <FaPhone className="mr-3 text-[#3c6e71]" />
                      <span>{ad.user.phone || "No phone available"}</span>
                    </p>
                    {ad.user.businessAddress && (
                      <p className="flex items-start">
                        <FaMapMarkerAlt className="mr-3 mt-1 text-[#3c6e71]" />
                        <span>
                          {`${ad.user.businessAddress.street}, ${ad.user.businessAddress.city}, ${ad.user.businessAddress.province}, ${ad.user.businessAddress.postalCode}`}
                        </span>
                      </p>
                    )}
                    {ad.user.website && (
                      <p className="flex items-center">
                        <FaGlobe className="mr-3 text-[#3c6e71]" />
                        <a
                          href={ad.user.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#284b63] hover:underline"
                        >
                          {ad.user.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Order and Management Section */}
          <div className="p-6 border-t border-[#d9d9d9]">
            <div className="md:flex gap-8">
              {/* Order Section */}
              {showOrderButton && (
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-lg font-semibold mb-4 border-b border-[#d9d9d9] pb-2">
                    Place Order
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium mb-2"
                    >
                      Required Quantity:
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      min="1"
                      className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#284b63]"
                    />
                  </div>
                  <button
                    className="bg-[#284b63] text-white px-6 py-2 rounded-md hover:bg-[#3c6e71] transition-colors"
                    onClick={handleOrderRequest}
                  >
                    Request to Order
                  </button>
                </div>
              )}
              {/* Management Section */}
              {showManagementButtons && (
                <div className={`${showOrderButton ? "md:w-1/2" : "w-full"}`}>
                  <h3 className="text-lg font-semibold mb-4 border-b border-[#d9d9d9] pb-2">
                    Manage Advertisement
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      onClick={handleDeleteAd}
                    >
                      <FaTrash className="mr-2" /> Delete Ad
                    </button>
                    {!isEditingStatus ? (
                      <button
                        className="flex items-center bg-[#d9d9d9] text-[#353535] px-4 py-2 rounded-md hover:bg-[#284b63] hover:text-white transition-colors"
                        onClick={() => {
                          setNewStatus(ad.status);
                          setIsEditingStatus(true);
                        }}
                      >
                        <FaEdit className="mr-2" /> Edit Status
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#284b63]"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          className="bg-[#284b63] text-white px-3 py-2 rounded-md hover:bg-[#3c6e71] transition-colors"
                          onClick={handleStatusEdit}
                        >
                          Save
                        </button>
                        <button
                          className="bg-[#d9d9d9] text-[#353535] px-3 py-2 rounded-md hover:bg-gray-400 transition-colors"
                          onClick={() => setIsEditingStatus(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Review Section */}
          <div className="p-6 border-t border-[#d9d9d9] bg-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaStar className="text-[#3c6e71] mr-2" /> Ratings & Reviews
            </h3>
            <Review adId={ad._id} reviews={ad.reviews} />
          </div>
          {/* Chat Section */}
          {user && ad && ad.user && user._id !== ad.user._id && (
            <div className="p-6 border-t border-[#d9d9d9] bg-white">
              <h3 className="text-lg font-semibold mb-4 border-b border-[#d9d9d9] pb-2">
                Contact Seller
              </h3>
              <textarea
                placeholder="Type your message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="w-full px-4 py-3 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#284b63] min-h-[120px] mb-4"
              />
              <button
                className="bg-[#284b63] text-white px-6 py-2 rounded-md hover:bg-[#3c6e71] transition-colors"
                onClick={handleSendChat}
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdDetails;
