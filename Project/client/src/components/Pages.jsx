import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BulkSMS from "./pages/BulkSMS";
import SMSCampaignService from "./SMSCampaignService";
import PaymentsService from "./PaymentsService";
import AirtimeService from "./AirtimeService";
import VoiceService from "./VoiceService";
import USSDService from "./USSDService";

export const services = [
  {
    id: "sms-campaign",
    name: "SMS Campaign",
    path: "/services/sms-campaign",
    component: SMSCampaignService,
  },
  {
    id: "payments",
    name: "Payments",
    path: "/services/payments",
    component: PaymentsService,
  },
  {
    id: "airtime",
    name: "Airtime",
    path: "/services/airtime",
    component: AirtimeService,
  },
  {
    id: "voice",
    name: "Voice",
    path: "/services/voice",
    component: VoiceService,
  },
  { id: "ussd", name: "USSD", path: "/services/ussd", component: USSDService },
];

function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/bulksms" element={<BulkSMS />} />
        <Route path="/services/sms-campaign" element={<SMSCampaignService />} />
        <Route path="/services/payments" element={<PaymentsService />} />
        <Route path="/services/airtime" element={<AirtimeService />} />
        <Route path="/services/voice" element={<VoiceService />} />
        <Route path="/services/ussd" element={<USSDService />} />
      </Routes>
    </Router>
  );
}

export default Pages;
