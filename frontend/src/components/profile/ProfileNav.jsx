import React from "react";

const ProfileNav = ({ activeTab, setActiveTab }) => {
  const tabs = ["profile", "gallery", "posts", "ads", "orders"];

  return (
    <div className="border-t border-[#d9d9d9]">
      <nav className="flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-left ${
              activeTab === tab
                ? "bg-[#d9d9d9] bg-opacity-20 font-medium border-l-4 border-[#284b63]"
                : "hover:bg-[#d9d9d9]"
            }`}
          >
            {tab === "profile"
              ? "Profile Information"
              : tab === "gallery"
              ? "Gallery"
              : tab === "posts"
              ? "Posts"
              : tab === "ads"
              ? "My Ads"
              : "My Orders"}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileNav;
