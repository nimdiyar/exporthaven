import React from "react";
import { Shield, Eye, UserCheck } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#284b63] py-6 px-8">
          <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="p-8">
          <p className="text-lg text-[#353535] mb-8">
            We are committed to protecting your personal data and privacy.
          </p>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Eye className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                Information Collection
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              We collect your email, phone number, and company details to
              enhance your experience on our platform. This information helps us
              tailor our services to better meet your export and manufacturing
              needs in Sri Lanka.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <Shield className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                How We Use Your Data
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              Your data is used to provide services, improve user experience,
              and comply with regulations. We analyze this information to
              enhance platform functionality and create a more seamless
              connection between Sri Lankan manufacturers and international
              exporters.
            </p>
          </section>
          <section className="mb-10">
            <div className="flex items-center mb-4">
              <UserCheck className="text-[#3c6e71] mr-3" size={24} />
              <h2 className="text-2xl font-semibold text-[#353535]">
                Your Rights
              </h2>
            </div>
            <p className="text-[#353535] pl-9">
              You have the right to request data deletion or modification at any
              time. We respect your privacy choices and provide transparent
              access to the information we maintain about your business and
              activities on our platform.
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

export default PrivacyPolicy;
