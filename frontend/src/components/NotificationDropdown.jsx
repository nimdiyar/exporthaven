import React from "react";
import PropTypes from "prop-types";

const NotificationDropdown = ({ notifications, onMarkAllRead }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-[#353535] mb-2">
        Notifications
      </h4>
      {notifications.length === 0 ? (
        <p className="text-[#353535]">No new notifications</p>
      ) : (
        notifications.map((n, index) => (
          <div
            key={index}
            className={`p-2 border-b border-[#d9d9d9] last:border-b-0 ${
              n.read ? "" : "bg-[#d9d9d9]/10"
            }`}
          >
            {n.message}
          </div>
        ))
      )}
      <button
        onClick={onMarkAllRead}
        className="w-full mt-2 px-4 py-2 bg-[#3c6e71] text-white rounded hover:bg-[#284b63] transition-colors"
      >
        Mark All as Read
      </button>
    </div>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkAllRead: PropTypes.func.isRequired,
};

export default NotificationDropdown;
