import React from "react";
import PropTypes from "prop-types";

const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`mb-3 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[65%] rounded-lg px-3 py-2 shadow-sm ${
          isOwnMessage
            ? "bg-[#3c6e71] text-white"
            : "bg-[#ffffff] text-[#353535] border border-[#d9d9d9]"
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div
          className={`text-xs mt-1 ${
            isOwnMessage ? "text-white/80" : "text-[#353535]/80"
          }`}
        >
          {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sender: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  isOwnMessage: PropTypes.bool,
};

export default ChatMessage;
