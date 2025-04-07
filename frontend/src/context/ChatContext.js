import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("receiveMessage", (messageData) => {
      console.log("Received message:", messageData);
      setMessages((prev) => [...prev, messageData]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = (receiverId, content, adId, type = "text") => {
    if (socket) {
      const currentUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
      if (!currentUser) return;
      const messageData = {
        senderId: currentUser._id, // Changed from "sender" to "senderId"
        receiverId,
        content,
        type,
        adId,
      };
      socket.emit("sendMessage", messageData);
      console.log("Sent message:", messageData);
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, sendMessage, socket }}
    >
      {children}
    </ChatContext.Provider>
  );
};
