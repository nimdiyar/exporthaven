import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaCogs,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaIdBadge,
  FaFileInvoice,
  FaTruckLoading,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../utils/apiConfig";

const initialState = {
  companyName: "",
  contactPerson: "",
  email: "",
  password: "",
  phone: "",
  businessAddress: {
    street: "",
    city: "",
    province: "",
    postalCode: "",
  },
  website: "",
  manufacturerType: "",
  establishmentDate: "",
  businessRegNumber: "",
  tin: "",
  productionCapacity: "",
  mainProducts: "",
  certifications: "",
};

const ManufacturerForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleBlur = (e) => {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "province", "postalCode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        businessAddress: {
          ...prev.businessAddress,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (
      !formData.companyName ||
      !formData.contactPerson ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.businessAddress.street ||
      !formData.businessRegNumber ||
      !formData.tin ||
      !formData.manufacturerType ||
      !formData.productionCapacity
    ) {
      toast.error("All required fields must be filled.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        ...formData,
        role: "manufacturer",
      });
      toast.success("Manufacturer registered successfully!");
      setFormData(initialState);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        Object.entries(validationErrors).forEach(([field, errorMsg]) => {
          toast.error(`${field}: ${errorMsg}`);
        });
        setErrors(validationErrors);
      } else {
        toast.error(error.response?.data?.message || "Registration failed.");
      }
    }
  };

  return (
    <>
      <form
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#353535] border-b border-[#d9d9d9] pb-3">
          MANUFACTURER REGISTRATION
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaBuilding className="mr-2 text-[#3c6e71]" /> Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">{errors.companyName}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactPerson"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaUser className="mr-2 text-[#3c6e71]" /> Contact Person
            </label>
            <input
              id="contactPerson"
              name="contactPerson"
              placeholder="Enter contact person name"
              value={formData.contactPerson}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.contactPerson && (
              <span className="text-red-500 text-sm">
                {errors.contactPerson}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaEnvelope className="mr-2 text-[#3c6e71]" /> Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaCogs className="mr-2 text-[#3c6e71]" /> Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaPhone className="mr-2 text-[#3c6e71]" /> Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="website"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaGlobe className="mr-2 text-[#3c6e71]" /> Website{" "}
              <span className="text-[#353535] text-xs ml-1">(Optional)</span>
            </label>
            <input
              id="website"
              name="website"
              placeholder="Enter website URL"
              value={formData.website}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-6 mb-4 text-[#353535] border-b border-[#d9d9d9] pb-2">
          Business Address
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="street"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaMapMarkerAlt className="mr-2 text-[#3c6e71]" /> Street
            </label>
            <input
              id="street"
              name="street"
              placeholder="Enter street address"
              value={formData.businessAddress.street}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.businessAddress && (
              <span className="text-red-500 text-sm">
                {errors.businessAddress}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaMapMarkerAlt className="mr-2 text-[#3c6e71]" /> City
            </label>
            <input
              id="city"
              name="city"
              placeholder="Enter city"
              value={formData.businessAddress.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.city && (
              <span className="text-red-500 text-sm">{errors.city}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="province"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaMapMarkerAlt className="mr-2 text-[#3c6e71]" /> Province
            </label>
            <input
              id="province"
              name="province"
              placeholder="Enter province"
              value={formData.businessAddress.province}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.province && (
              <span className="text-red-500 text-sm">{errors.province}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="postalCode"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaMapMarkerAlt className="mr-2 text-[#3c6e71]" /> Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              placeholder="Enter postal code"
              value={formData.businessAddress.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.postalCode && (
              <span className="text-red-500 text-sm">{errors.postalCode}</span>
            )}
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-6 mb-4 text-[#353535] border-b border-[#d9d9d9] pb-2">
          Business Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="manufacturerType"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaBuilding className="mr-2 text-[#3c6e71]" /> Manufacturer Type
            </label>
            <input
              id="manufacturerType"
              name="manufacturerType"
              placeholder="Enter manufacturer type"
              value={formData.manufacturerType}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.manufacturerType && (
              <span className="text-red-500 text-sm">
                {errors.manufacturerType}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="productionCapacity"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaCogs className="mr-2 text-[#3c6e71]" /> Production Capacity
            </label>
            <textarea
              id="productionCapacity"
              name="productionCapacity"
              placeholder="Enter production capacity"
              value={formData.productionCapacity}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.productionCapacity && (
              <span className="text-red-500 text-sm">
                {errors.productionCapacity}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="establishmentDate"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaCalendarAlt className="mr-2 text-[#3c6e71]" /> Establishment
              Date
            </label>
            <input
              id="establishmentDate"
              name="establishmentDate"
              type="date"
              value={formData.establishmentDate}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.establishmentDate && (
              <span className="text-red-500 text-sm">
                {errors.establishmentDate}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="businessRegNumber"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaIdBadge className="mr-2 text-[#3c6e71]" /> Business Reg. Number
            </label>
            <input
              id="businessRegNumber"
              name="businessRegNumber"
              placeholder="Enter registration number"
              value={formData.businessRegNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.businessRegNumber && (
              <span className="text-red-500 text-sm">
                {errors.businessRegNumber}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="tin"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaFileInvoice className="mr-2 text-[#3c6e71]" /> TIN
            </label>
            <input
              id="tin"
              name="tin"
              placeholder="Enter TIN"
              value={formData.tin}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.tin && (
              <span className="text-red-500 text-sm">{errors.tin}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="exportLicense"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaTruckLoading className="mr-2 text-[#3c6e71]" /> Export License
            </label>
            <input
              id="exportLicense"
              name="exportLicense"
              placeholder="Enter export license"
              value={formData.exportLicense}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
            {errors.exportLicense && (
              <span className="text-red-500 text-sm">
                {errors.exportLicense}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="exportMarkets"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaGlobe className="mr-2 text-[#3c6e71]" /> Export Markets
            </label>
            <input
              id="exportMarkets"
              name="exportMarkets"
              placeholder="Enter export markets (comma separated)"
              value={formData.exportMarkets}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="products"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaBuilding className="mr-2 text-[#3c6e71]" /> Products
            </label>
            <input
              id="products"
              name="products"
              placeholder="Enter products (comma separated)"
              value={formData.products}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="shippingMethods"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaTruckLoading className="mr-2 text-[#3c6e71]" /> Shipping
              Methods
            </label>
            <input
              id="shippingMethods"
              name="shippingMethods"
              placeholder="Enter shipping methods (comma separated)"
              value={formData.shippingMethods}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="certifications"
              className="flex items-center text-[#353535] mb-1 font-medium"
            >
              <FaTruckLoading className="mr-2 text-[#3c6e71]" /> Certifications
            </label>
            <input
              id="certifications"
              name="certifications"
              placeholder="Enter certifications (comma separated)"
              value={formData.certifications}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
            />
          </div>
        </div>
        <button
          className="w-full bg-[#3c6e71] hover:bg-[#284b63] text-white font-semibold py-3 px-4 rounded-md transition duration-200 mt-6 focus:outline-none focus:ring-2 focus:ring-[#3c6e71]"
          type="submit"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default ManufacturerForm;
