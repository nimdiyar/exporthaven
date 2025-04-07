// frontend\src\App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home.tsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExporterAds from "./pages/ExporterAds";
import ManufacturerAds from "./pages/ManufacturerAds";
import AdminDashboard from "./pages/AdminDashboard";
import AdDetails from "./pages/AdDetails";
import Insights, {
  DemandChartPage,
  DerivativesChartPage,
} from "./pages/Insights";
import Pricing from "./pages/Pricing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Chat from "./pages/Chat";
import ChatInbox from "./pages/ChatInbox";

// Profile Pages
import ExporterProfile from "./pages/ExporterProfile";
import ManufacturerProfile from "./pages/ManufacturerProfile";

// Listing & Public Profile Pages
import ExporterListing from "./pages/ExporterListing";
import ManufacturerListing from "./pages/ManufacturerListing";
import PublicProfile from "./pages/PublicProfile";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Context Providers
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { NotificationProvider } from "./context/NotificationContext";

import "./App.css";

const ProfileRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role === "exporter") return <ExporterProfile />;
  if (user.role === "manufacturer") return <ManufacturerProfile />;
  return <div>Profile not available for admin.</div>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<ProfileRoute />} />
    <Route path="/ad/:id" element={<AdDetails />} />
    <Route path="/exporter-ads" element={<ExporterAds />} />
    <Route path="/manufacturer-ads" element={<ManufacturerAds />} />
    <Route path="/insights" element={<Insights />} />
    <Route path="/insights/demand-chart/:month/:country" element={<DemandChartPage />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/chat/inbox" element={<ChatInbox />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/exporters" element={<ExporterListing />} />
    <Route path="/manufacturers" element={<ManufacturerListing />} />
    <Route path="/public-profile/:userId" element={<PublicProfile />} />
  </Routes>
);

const App = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <NotificationProvider>
          <Router>
            <Navbar />
            <div className="app-container">
              <AppRoutes />
            </div>
            <Footer />
          </Router>
        </NotificationProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;
