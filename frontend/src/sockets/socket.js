// chatSocket.js (server-side)
let onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      // Emit "receiveMessage" to the receiver's socket
      io.to(receiverSocketId).emit("receiveMessage", {
        sender: senderId,
        message,
        timestamp: Date.now(),
      });
    }
  });

  socket.on("disconnect", () => {
    [...onlineUsers.entries()].forEach(([key, val]) => {
      if (val === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});
