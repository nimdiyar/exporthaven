import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../utils/apiConfig";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const ChatInbox = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchChats = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${API_BASE_URL}/api/chat/user/${user._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setChats(res.data);
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      };
      fetchChats();
    }
  }, [user]);

  const handleChatClick = (chat) => {
    const otherUser = chat.participants.find((p) => p._id !== user._id);
    if (!otherUser) return;
    navigate("/chat", {
      state: {
        receiverId: otherUser._id,
        adId: chat.ad || null,
        adInfo: chat.adInfo || null,
      },
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto px-5 py-8 bg-white rounded-lg shadow-md min-h-[calc(100vh-300px)]">
        <h2 className="text-2xl font-semibold text-[#353535] mb-5 border-b border-[#d9d9d9] pb-3">
          Inbox
        </h2>

        {chats.length === 0 ? (
          <div className="text-center py-10 bg-[#ffffff]/50 rounded-lg">
            <MessageSquare
              size={48}
              className="mx-auto text-[#3c6e71] mb-3 opacity-50"
            />
            <p className="text-[#353535]">No conversations yet.</p>
            <p className="text-sm text-[#353535] mt-2">
              Your messages will appear here
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#d9d9d9]">
            {chats.map((chat) => {
              const otherUser = chat.participants.find(
                (p) => p._id !== user._id
              );
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <li
                  key={chat._id}
                  className="py-3 px-3 hover:bg-[#ffffff] rounded-md cursor-pointer transition-colors"
                  onClick={() => handleChatClick(chat)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#3c6e71] text-white flex items-center justify-center mr-2">
                        {otherUser?.name?.charAt(0) || "U"}
                      </div>
                      <span className="font-medium text-[#353535]">
                        {otherUser ? otherUser.name : "Unknown"}
                      </span>
                    </div>
                    {chat.ad && (
                      <span className="text-xs bg-[#3c6e71] text-white px-2 py-1 rounded-full">
                        Ad related
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <div className="flex justify-between items-center ml-10">
                      <span className="text-sm text-[#353535] truncate max-w-[70%]">
                        {lastMessage.content}
                      </span>
                      <span className="text-xs text-[#353535]">
                        {new Date(lastMessage.timestamp).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatInbox;
