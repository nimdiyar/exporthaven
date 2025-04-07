import React, { useState, useEffect } from "react";
import { FiCamera, FiMail, FiPhone } from "react-icons/fi";
const ProfilePhotoSection = ({
  profilePhoto,
  onChange,
  onUpload,
  companyName,
  email,
  phone,
}) => {
  const [preview, setPreview] = useState(profilePhoto);
  useEffect(() => {
    setPreview(profilePhoto);
  }, [profilePhoto]);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8 flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src={
              preview ||
              `https://ui-avatars.com/api/?name=${
                companyName || "User"
              }&background=284b63&color=fff&size=200`
            }
            alt="Profile"
            className="w-48 h-48 rounded-full object-cover border-4 border-[#d9d9d9]"
          />
          <label className="absolute bottom-2 right-2 bg-[#284b63] text-white p-3 rounded-full cursor-pointer hover:bg-[#3c6e71] transition shadow-md ring-2 ring-white">
            <FiCamera size={24} />
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={onUpload}
          className="mb-6 px-6 py-2.5 bg-[#3c6e71] text-[#ffffff] rounded-md hover:bg-[#284b63] hover:text-white transition w-full text-sm font-medium"
        >
          Update Profile Photo
        </button>
        <h2 className="text-2xl font-bold text-[#353535] text-center mb-2">
          {companyName || "Company Name"}
        </h2>
        <div className="w-full mt-4 space-y-3">
          <div className="flex items-center gap-3 text-base text-[#353535]">
            <FiMail className="text-[#284b63] text-lg" />
            <span className="truncate">{email || "Email"}</span>
          </div>
          <div className="flex items-center gap-3 text-base text-[#353535]">
            <FiPhone className="text-[#284b63] text-lg" />
            <span>{phone || "Phone"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePhotoSection;
