import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChatIcon = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat/inbox");
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#d9d9d9]/20 cursor-pointer transition-colors"
        onClick={handleClick}
      >
        <IoChatbubbleEllipsesOutline className="text-[#ffffff] text-[24px]" />
      </div>
    </div>
  );
};

export default ChatIcon;
