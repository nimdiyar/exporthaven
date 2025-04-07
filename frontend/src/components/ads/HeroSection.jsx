// frontend\src\components\ads\HeroSection.jsx
import React from "react";

const HeroSection = ({ title, subtitle }) => {
  return (
    <div className="relative bg-[#ffffff] rounded-xl p-8 mb-8 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Background Overlay with Subtle Animation */}
      <div className="absolute inset-0 bg-[#d9d9d9] opacity-20 transform scale-110 animate-pulse-slow"></div>

      {/* Decorative Accent Line */}
      <div className="absolute top-0 left-0 w-24 h-1 bg-[#353535] rounded-b-md"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#284b63] mb-3 transition-transform duration-300 hover:translate-x-1">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-[#353535] opacity-90 transition-opacity duration-300 hover:opacity-100">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
