import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import ChatIcon from "./ChatIcon";
import { useAuth } from "../context/AuthContext";
import { FaChartLine, FaUser, FaTachometerAlt } from "react-icons/fa";
import logoIcon from "../assets/logoIcon.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav
      className={`w-full py-4 px-6 md:px-12 transition-all duration-300 bg-[#3c6e71] shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <img
              src={logoIcon}
              alt="ExportHaven Logo"
              className="h-11 w-auto"
            />
            <span className="text-white font-bold text-2xl">ExportHaven</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/exporter-ads"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Exporter Ads
              </Link>
              <Link
                to="/manufacturer-ads"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Manufacturer Marketplace
              </Link>
              <Link
                to="/exporters"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Our Exporters
              </Link>
              <Link
                to="/manufacturers"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Our Manufacturers
              </Link>
              <Link
                to="/insights"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors flex items-center gap-1"
                onClick={closeMenu}
              >
                <FaChartLine /> Insights
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/pricing"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                to="/about-us"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                About Us
              </Link>
              <Link
                to="/contact-us"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
              <Link
                to="/exporters"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Our Exporters
              </Link>
              <Link
                to="/manufacturers"
                className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                onClick={closeMenu}
              >
                Our Manufacturers
              </Link>
            </>
          )}
        </div>

        {/* Right Section - Tools and Auth */}
        <div className="flex items-center space-x-4">
          {/* Tools Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn && (
              <>
                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="text-white hover:text-[#d9d9d9]"
                    title="Admin Dashboard"
                  >
                    <FaTachometerAlt size={24} />
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="text-white hover:text-[#d9d9d9]"
                    title="Profile"
                  >
                    <FaUser size={21} />
                  </Link>
                )}
                <NotificationBell />
                <ChatIcon />
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <button
                className="bg-[#284b63] hover:bg-[#1a3447] text-white px-4 py-2 rounded-md transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-[#d9d9d9] font-medium transition-colors"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#284b63] hover:bg-[#1a3447] text-white px-4 py-2 rounded-md transition-colors"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "transform rotate-45 translate-y-1.5" : "mb-1.5"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "mb-1.5"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-[#3c6e71] transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={closeMenu}
            >
              <img
                src={logoIcon}
                alt="ExportHaven Logo"
                className="h-10 w-auto"
              />
              <span className="text-white font-bold text-xl">ExportHaven</span>
            </Link>
            <button
              className="flex items-center justify-center w-8 h-8"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col space-y-4 mt-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/exporter-ads"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Exporter Ads
                </Link>
                <Link
                  to="/manufacturer-ads"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Manufacturer Marketplace
                </Link>
                <Link
                  to="/exporters"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Our Exporters
                </Link>
                <Link
                  to="/manufacturers"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Our Manufacturers
                </Link>
                <Link
                  to="/insights"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors flex items-center gap-1"
                  onClick={closeMenu}
                >
                  <FaChartLine /> Insights
                </Link>
                {user.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Pricing
                </Link>
                <Link
                  to="/about-us"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  About Us
                </Link>
                <Link
                  to="/contact-us"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
                <Link
                  to="/exporters"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Our Exporters
                </Link>
                <Link
                  to="/manufacturers"
                  className="text-white hover:text-[#d9d9d9] font-medium py-2 transition-colors"
                  onClick={closeMenu}
                >
                  Our Manufacturers
                </Link>
              </>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex flex-col space-y-3">
              {isLoggedIn ? (
                <button
                  className="w-full bg-[#284b63] hover:bg-[#1a3447] text-white py-3 rounded-md transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center border border-white text-white py-3 rounded-md transition-colors hover:bg-white hover:text-[#3c6e71]"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center bg-[#284b63] hover:bg-[#1a3447] text-white py-3 rounded-md transition-colors"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
