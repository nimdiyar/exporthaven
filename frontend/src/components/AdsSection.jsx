// frontend/src/components/AdsSection.js
import React, { useContext } from "react";
import ExporterAds from "../pages/ExporterAds";
import ManufacturerAds from "../pages/ManufacturerAds";
import { AuthContext } from "../context/AuthContext";

const AdsSection = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please log in to view ads.</div>;
  }

  return (
    <div>
      {user.role === "exporter" && (
        <div>
          <h2>Exporter Ads</h2>
          <ExporterAds />
        </div>
      )}
      {user.role === "manufacturer" && (
        <div>
          <h2>Manufacturer Ads</h2>
          <ManufacturerAds />
        </div>
      )}
    </div>
  );
};

export default AdsSection;
