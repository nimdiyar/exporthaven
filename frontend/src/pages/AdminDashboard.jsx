import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../utils/apiConfig";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  const fetchAdminDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data: statsData } = await axios.get(
        `${API_BASE_URL}/api/admin/dashboard`,
        config
      );
      setStats(statsData);
      const [usersRes, adsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/users`, config),
        axios.get(`${API_BASE_URL}/api/admin/ads`, config),
      ]);
      setUsers(usersRes.data);
      setAds(adsRes.data);
    } catch (error) {
      setError("Error fetching admin data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveAd = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/admin/ads/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAdminDashboardData();
      toast.success("Ad approved successfully!");
    } catch (error) {
      toast.error("Error approving ad.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdminDashboardData();
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };

  const handleRemoveAd = async (id) => {
    if (!window.confirm("Are you sure you want to remove this ad?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/api/admin/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdminDashboardData();
      toast.success("Ad removed successfully!");
    } catch (error) {
      toast.error("Error removing ad.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff]">
        <p className="text-lg text-[#353535] font-medium">
          Loading admin data...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-[#ffffff]">
        <p className="text-lg text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#353535] p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#353535]">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#3c6e71]">
          <p className="text-sm text-[#353535]">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#3c6e71]">
          <p className="text-sm text-[#353535]">Total Ads</p>
          <p className="text-2xl font-bold">{stats.totalAds}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#3c6e71]">
          <p className="text-sm text-[#353535]">Total Orders</p>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#284b63]">
          <p className="text-sm text-[#353535]">Pending Orders</p>
          <p className="text-2xl font-bold">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#284b63]">
          <p className="text-sm text-[#353535]">Pending Ads</p>
          <p className="text-2xl font-bold">{stats.pendingAds}</p>
        </div>
      </div>
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-[#353535] border-b border-[#d9d9d9] pb-2">
          Manage Users
        </h3>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-[#d9d9d9]">
            <thead className="bg-[#3c6e71] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  User Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#d9d9d9]">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-[#f7f7f7]" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.companyName || user.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition duration-200"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-[#353535] border-b border-[#d9d9d9] pb-2">
          Manage Ads
        </h3>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-[#d9d9d9]">
            <thead className="bg-[#3c6e71] text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Posted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#d9d9d9]">
              {ads.map((ad, index) => (
                <tr
                  key={ad._id}
                  className={index % 2 === 0 ? "bg-[#f7f7f7]" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">{ad.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ad.user?.companyName ||
                      ad.user?.name ||
                      ad.user?.contactPerson ||
                      "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        ad.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ad.status === "approved" ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {ad.status === "approved" ? (
                      <span className="text-green-600 text-sm">
                        Already Approved
                      </span>
                    ) : (
                      <button
                        className="bg-[#284b63] hover:bg-[#1d3a4f] text-white py-1 px-3 rounded-md text-sm transition duration-200"
                        onClick={() => handleApproveAd(ad._id)}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm transition duration-200 ml-2"
                      onClick={() => handleRemoveAd(ad._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminDashboard;
