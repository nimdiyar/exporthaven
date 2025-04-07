import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
} from "lucide-react";
import logoIcon from "../assets/logoIcon.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement subscription logic
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#284b63] border-t border-[#ffffff] pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logoIcon} alt="ExportHaven Logo" className="w-9 h-7" />
              <span className="font-bold text-xl text-white">ExportHaven</span>
            </div>
            <p className="text-[#ffffff] text-sm leading-relaxed">
              Connecting manufacturers and exporters worldwide. Your trusted
              platform for global trade opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/exporters"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Exporter Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/manufacturers"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Manufacturer Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Trade Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
                >
                  Business Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">
              Connect With Us
            </h3>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=61572803108702&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3c6e71] flex items-center justify-center text-white hover:bg-[#284b63] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/haven39764?t=F30vXQ6m0TXx5sjrExp_pQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3c6e71] flex items-center justify-center text-white hover:bg-[#284b63] transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/exporthaven/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3c6e71] flex items-center justify-center text-white hover:bg-[#284b63] transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/exporthaven/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3c6e71] flex items-center justify-center text-white hover:bg-[#284b63] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-white mb-2">
                Newsletter
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3 py-2 border border-[#ffffff] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#3c6e71] text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-[#3c6e71] hover:bg-[#284b63] text-white px-3 py-2 rounded-r-md transition-colors flex items-center"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#ffffff] pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#ffffff] text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ExportHaven. All rights
              reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/privacy-policy"
                className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                to="/#"
                className="text-[#ffffff] hover:text-[#3c6e71] transition-colors text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
