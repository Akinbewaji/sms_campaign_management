"use client";

import React from "react";
import ServiceLayout from "./ServiceLayout";
import "./ServicePlaceholder.css";

export default function VoiceService() {
  return (
    <ServiceLayout serviceName="Voice">
      <div className="service-placeholder">
        <div className="placeholder-icon">☎️</div>
        <h2>Voice Service</h2>
        <p>Make and receive voice calls programmatically.</p>
        <div className="placeholder-features">
          <div className="feature">
            <h4>Voice Calls</h4>
            <p>Initiate and manage voice calls</p>
          </div>
          <div className="feature">
            <h4>Call Recording</h4>
            <p>Record and store voice interactions</p>
          </div>
          <div className="feature">
            <h4>IVR Systems</h4>
            <p>Build Interactive Voice Response systems</p>
          </div>
        </div>
        <button className="btn-coming-soon">Coming Soon</button>
      </div>
    </ServiceLayout>
  );
}
