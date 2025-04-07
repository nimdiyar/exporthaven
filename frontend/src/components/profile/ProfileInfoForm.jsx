import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

const ProfileInfoForm = ({
  contactPerson,
  setContactPerson,
  establishmentDate,
  setEstablishmentDate,
  businessRegNumber,
  setBusinessRegNumber,
  certifications,
  setCertifications,
  businessAddress,
  setBusinessAddress,
  bio,
  setBio,
  socialMedia,
  setSocialMedia,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-[#353535] border-b pb-2">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#353535] mb-1">
            Contact Person
          </label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
            placeholder="Contact Person Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#353535] mb-1">
            Establishment Date
          </label>
          <input
            type="date"
            value={establishmentDate}
            onChange={(e) => setEstablishmentDate(e.target.value)}
            className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#353535] mb-1">
            Business Registration Number
          </label>
          <input
            type="text"
            value={businessRegNumber}
            onChange={(e) => setBusinessRegNumber(e.target.value)}
            className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
            placeholder="Business Registration Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#353535] mb-1">
            Certifications
          </label>
          <input
            type="text"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
            placeholder="Certifications (comma separated)"
          />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-[#353535]">
          Business Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Street
            </label>
            <input
              type="text"
              value={businessAddress.street || ""}
              onChange={(e) =>
                setBusinessAddress({
                  ...businessAddress,
                  street: e.target.value,
                })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Street Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              City
            </label>
            <input
              type="text"
              value={businessAddress.city || ""}
              onChange={(e) =>
                setBusinessAddress({ ...businessAddress, city: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Province/State
            </label>
            <input
              type="text"
              value={businessAddress.province || ""}
              onChange={(e) =>
                setBusinessAddress({
                  ...businessAddress,
                  province: e.target.value,
                })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Province/State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#353535] mb-1">
              Postal Code
            </label>
            <input
              type="text"
              value={businessAddress.postalCode || ""}
              onChange={(e) =>
                setBusinessAddress({
                  ...businessAddress,
                  postalCode: e.target.value,
                })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Postal Code"
            />
          </div>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#353535] mb-1">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none h-32"
          placeholder="Write your bio here..."
        ></textarea>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-[#353535]">
          Social Media
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FiFacebook className="text-[#284b63]" />
            <input
              type="text"
              value={socialMedia.facebook || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, facebook: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Facebook URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiTwitter className="text-[#284b63]" />
            <input
              type="text"
              value={socialMedia.twitter || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, twitter: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Twitter URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiInstagram className="text-[#284b63]" />
            <input
              type="text"
              value={socialMedia.instagram || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, instagram: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="Instagram URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiLinkedin className="text-[#284b63]" />
            <input
              type="text"
              value={socialMedia.linkedIn || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, linkedIn: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="LinkedIn URL"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiYoutube className="text-[#284b63]" />
            <input
              type="text"
              value={socialMedia.youtube || ""}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, youtube: e.target.value })
              }
              className="w-full p-2 border border-[#d9d9d9] rounded-md focus:ring-[#284b63] focus:border-[#284b63] outline-none"
              placeholder="YouTube URL"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="px-6 py-2 bg-[#284b63] text-white rounded-md hover:bg-[#3c6e71] transition font-medium"
        >
          Save Profile Information
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
