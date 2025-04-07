// frontend/src/utils/api.js
import axios from "axios";
import API_BASE_URL from "./apiConfig";

export const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
