import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { fetchNotifications } from "../utils/api";

const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications().then((data) => {
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.read).length);
      });
    }
  }, [user]);

  const markAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#d9d9d9]/20 cursor-pointer transition-colors"
        onClick={() => setOpen(!open)}
      >
        <IoNotificationsOutline className="text-[#ffffff] text-[24px]" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-[#3c6e71] text-white text-xs font-bold rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 overflow-hidden border border-[#d9d9d9]">
          <div className="p-3 border-b border-[#d9d9d9] bg-[#ffffff]">
            <h4 className="text-[#353535] font-medium">Notifications</h4>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-[#353535]">
                No new notifications
              </p>
            ) : (
              notifications.map((n, index) => (
                <div
                  key={index}
                  className={`p-3 border-b border-[#d9d9d9] hover:bg-[#ffffff] transition-colors ${
                    n.read ? "bg-white" : "bg-[#3c6e71]/10"
                  }`}
                >
                  <p className="text-sm text-[#353535]">{n.message}</p>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 bg-[#ffffff] flex justify-center">
              <button
                onClick={markAsRead}
                className="px-4 py-2 bg-[#3c6e71] hover:bg-[#284b63] text-white text-sm rounded-md transition-colors"
              >
                Mark All as Read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
