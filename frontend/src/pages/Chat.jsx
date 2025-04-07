import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import ChatMessage from "../components/ChatMessage";
import { Send, User } from "lucide-react";
import API_BASE_URL from "../utils/apiConfig";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const { receiverId, adId, adInfo } = state || {};
  const { messages, setMessages, sendMessage, socket } =
    useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && socket && receiverId) {
      const roomData = { userId1: user._id, userId2: receiverId, adId };
      socket.emit("joinRoom", roomData);
      console.log("Joining room with:", roomData);
    }
  }, [user, socket, receiverId, adId]);

  useEffect(() => {
    if (!user || !receiverId) return;
    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${API_BASE_URL}/api/chat/${user._id}/${receiverId}${
            adId ? `?adId=${adId}` : ""
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data && data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [user, receiverId, adId, setMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(receiverId, newMessage, adId);
    setNewMessage("");
  };

  const getSenderId = (msg) => {
    return msg.sender && typeof msg.sender === "object"
      ? msg.sender._id
      : msg.sender || msg.senderId;
  };

  return (
    <div className="p-8">
      <div className="flex flex-col h-[calc(100vh-64px)] max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#ffffff] border-b border-[#d9d9d9] p-3">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3c6e71] text-white mr-3">
              <User size={20} />
            </div>
            <div>
              <h2 className="font-medium text-[#353535]">Chat Support</h2>
              <span className="text-xs text-[#3c6e71] flex items-center">
                <span className="w-2 h-2 bg-[#3c6e71] rounded-full mr-1"></span>
                Online
              </span>
            </div>
          </div>
          {adId && adInfo && (
            <div className="mt-2 p-2 bg-[#3c6e71]/10 rounded text-sm text-[#353535]">
              <h4 className="font-medium">Chat about: {adInfo.title}</h4>
            </div>
          )}
        </div>

        <div
          className="flex-1 p-4 overflow-y-auto bg-white"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80")',
            backgroundSize: "cover",
            backgroundBlendMode: "lighten",
            backgroundOpacity: "0.1",
          }}
        >
          <div className="space-y-1">
            {messages.map((msg, index) => {
              const senderId = getSenderId(msg);
              const isOwnMessage = String(senderId) === String(user._id);
              return (
                <ChatMessage
                  key={index}
                  message={msg}
                  isOwnMessage={isOwnMessage}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-3 bg-[#ffffff] border-t border-[#d9d9d9] flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 py-2 px-4 bg-white border border-[#d9d9d9] rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#3c6e71]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#3c6e71] hover:bg-[#284b63] text-white p-2 rounded-r-md transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
