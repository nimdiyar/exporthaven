//frontend\src\hooks\useChat.js
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const useChat = (userId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!userId) return;

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = (receiver, content) => {
    if (!content.trim()) return;
    const messageData = { sender: userId, receiver, content };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [...prev, messageData]);
  };

  return { messages, sendMessage };
};

export default useChat;
