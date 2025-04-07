import React, { useState } from "react";
import ExporterForm from "../components/ExporterForm";
import ManufacturerForm from "../components/ManufacturerForm";

const Register = () => {
  const [userType, setUserType] = useState("exporter");

  return (
    <div className="min-h-screen bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#353535]">
            Create an Account
          </h1>
          <p className="mt-2 text-lg text-[#353535]">
            Join Sri Lanka's premier export platform
          </p>
        </div>
        <div className="mt-8 bg-white shadow-md rounded-lg p-8">
          <div className="mb-8">
            <label className="text-lg font-medium text-[#353535] block mb-4">
              I am registering as a:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="exporter"
                  checked={userType === "exporter"}
                  onChange={() => setUserType("exporter")}
                  className="h-5 w-5 text-[#3c6e71] focus:ring-[#3c6e71]"
                />
                <span className="text-[#353535]">Exporter</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="manufacturer"
                  checked={userType === "manufacturer"}
                  onChange={() => setUserType("manufacturer")}
                  className="h-5 w-5 text-[#3c6e71] focus:ring-[#3c6e71]"
                />
                <span className="text-[#353535]">Manufacturer</span>
              </label>
            </div>
          </div>
          <div className="border-t border-[#d9d9d9] pt-8">
            {userType === "exporter" ? <ExporterForm /> : <ManufacturerForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
