import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../utils/apiConfig";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
        email,
      });
      toast.success(
        res.data.message || "Reset link sent! Please check your email."
      );
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error sending reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#353535]">
          Forgot Password
        </h2>
        <p className="mt-2 text-center text-sm text-[#353535]">
          Enter your email and we'll send you a password reset link
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#353535]"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#353535]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-[#284b63] focus:border-[#284b63]"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#284b63] hover:bg-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#284b63] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
