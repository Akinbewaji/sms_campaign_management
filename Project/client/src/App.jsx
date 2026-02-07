import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import SMSCampaignService from "./components/SMSCampaignService";
import PaymentsService from "./components/PaymentsService";
import AirtimeService from "./components/AirtimeService";
import VoiceService from "./components/VoiceService";
import USSDService from "./components/USSDService";
import { authService } from "./services/authService";
import "./App.css";

function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Service Routes */}
        <Route
          path="/services/sms-campaign"
          element={
            <ProtectedRoute>
              <SMSCampaignService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/payments"
          element={
            <ProtectedRoute>
              <PaymentsService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/airtime"
          element={
            <ProtectedRoute>
              <AirtimeService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/voice"
          element={
            <ProtectedRoute>
              <VoiceService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/ussd"
          element={
            <ProtectedRoute>
              <USSDService />
            </ProtectedRoute>
          }
        />

        {/* Fallback redirect for old dashboard route */}
        <Route
          path="/dashboard"
          element={<Navigate to="/services/sms-campaign" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
