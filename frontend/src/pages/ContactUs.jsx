import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Building2, Clock } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";
import { toast, ToastContainer } from "react-toastify";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/contact`, formData);
      toast.success(res.data.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-[#ffffff] min-h-screen w-full mt-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#353535] mb-4">Contact Us</h2>
        <div className="w-24 h-1 bg-[#3c6e71] mx-auto mb-6"></div>
        <p className="text-lg text-[#353535] max-w-2xl mx-auto">
          Connect with Sri Lanka's Premier Export Platform
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#3c6e71]">
              <div className="flex items-start">
                <Building2
                  className="text-[#3c6e71] mr-4 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#353535]">
                    Our Office
                  </h3>
                  <p className="text-[#353535] mt-1">
                    World Trade Center, Colombo 01, Sri Lanka
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#3c6e71]">
              <div className="flex items-start">
                <Clock
                  className="text-[#3c6e71] mr-4 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#353535]">
                    Business Hours
                  </h3>
                  <p className="text-[#353535] mt-1">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-[#353535]">Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <Phone
                    className="text-[#3c6e71] mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-[#353535]">
                      Phone
                    </h3>
                    <p className="text-[#353535] mt-1">+94 11 234 5678</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <Mail
                    className="text-[#3c6e71] mr-4 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-[#353535]">
                      Email
                    </h3>
                    <p className="text-[#353535] mt-1">
                      exporthaven124@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start">
                <MapPin
                  className="text-[#3c6e71] mr-4 flex-shrink-0"
                  size={24}
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#353535]">
                    Location
                  </h3>
                  <p className="text-[#353535] mt-1">
                    Strategically located in the heart of Colombo's business
                    district, we're here to facilitate your export journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#353535] mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#353535] mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#284b63] focus:border-[#284b63]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#353535] mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#284b63] focus:border-[#284b63]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#353535] mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#284b63] focus:border-[#284b63]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#353535] mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#284b63] focus:border-[#284b63]"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#3c6e71] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3c6e71]"
              >
                <Send size={20} className="mr-2" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ContactUs;
