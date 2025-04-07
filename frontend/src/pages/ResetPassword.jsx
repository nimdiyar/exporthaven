import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../utils/apiConfig";
import { Lock, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (passwordStrength < 3) {
      toast.warning("Please use a stronger password.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      toast.success(res.data.message || "Password reset successful!");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error resetting password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#353535]">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-[#353535]">
          Please enter a new password for your account
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#353535]"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#353535]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full pl-10 pr-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-[#284b63] focus:border-[#284b63]"
                  placeholder="Enter new password"
                  required
                />
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-[#d9d9d9] rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          passwordStrength === 0
                            ? "bg-red-500"
                            : passwordStrength === 1
                            ? "bg-red-400"
                            : passwordStrength === 2
                            ? "bg-yellow-400"
                            : passwordStrength === 3
                            ? "bg-green-400"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength * 25}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs text-[#353535]">
                      {passwordStrength === 0 && "Very Weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very Strong"}
                    </span>
                  </div>
                  <ul className="mt-2 text-xs space-y-1 text-[#353535]">
                    <li className="flex items-center">
                      <CheckCircle
                        size={12}
                        className={`mr-1 ${
                          password.length >= 8
                            ? "text-green-500"
                            : "text-[#d9d9d9]"
                        }`}
                      />
                      At least 8 characters
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        size={12}
                        className={`mr-1 ${
                          /[A-Z]/.test(password)
                            ? "text-green-500"
                            : "text-[#d9d9d9]"
                        }`}
                      />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        size={12}
                        className={`mr-1 ${
                          /[0-9]/.test(password)
                            ? "text-green-500"
                            : "text-[#d9d9d9]"
                        }`}
                      />
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <CheckCircle
                        size={12}
                        className={`mr-1 ${
                          /[^A-Za-z0-9]/.test(password)
                            ? "text-green-500"
                            : "text-[#d9d9d9]"
                        }`}
                      />
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#353535]"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#353535]" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-[#284b63] focus:border-[#284b63] ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500"
                      : "border-[#d9d9d9]"
                  }`}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={
                  loading ||
                  password !== confirmPassword ||
                  passwordStrength < 3
                }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#284b63] hover:bg-[#3c6e71] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#284b63] disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
