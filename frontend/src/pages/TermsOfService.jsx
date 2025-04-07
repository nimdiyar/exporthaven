import React from "react";
import { FileText, Shield, AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#284b63] py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        </div>
        <div className="p-8">
          <p className="text-lg text-[#353535] mb-8">
            By using our platform, you agree to the following terms and
            conditions.
          </p>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Shield className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                Account Responsibilities
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              Users are responsible for maintaining account security and
              accuracy of business details. You must provide truthful
              information about your manufacturing or export business and keep
              your login credentials secure. Any activity that occurs under your
              account is your responsibility.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <FileText className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                Platform Usage
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              The platform must be used for legal trade and export purposes
              only. You agree not to use ExportHaven for any illegal activities
              or to facilitate transactions that violate local or international
              laws. Our platform is designed to support legitimate Sri Lankan
              businesses in their export and manufacturing endeavors.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <AlertTriangle className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                Termination Policy
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              We reserve the right to terminate accounts violating our policies.
              ExportHaven may suspend or permanently remove access to the
              platform if we determine that a user has engaged in prohibited
              activities, provided false information, or otherwise violated
              these terms of service. We will provide notice when possible but
              reserve the right to take immediate action when necessary.
            </p>
          </section>
          <div className="mt-12 pt-6 border-t border-[#d9d9d9]">
            <p className="text-sm text-[#353535]">Last updated: June 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
