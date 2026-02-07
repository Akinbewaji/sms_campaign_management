"use client";

import React from "react";
import ServiceLayout from "./ServiceLayout";
import "./ServicePlaceholder.css";

export default function USSDService() {
  return (
    <ServiceLayout serviceName="USSD">
      <div className="service-placeholder">
        <div className="placeholder-icon">⌨️</div>
        <h2>USSD Service</h2>
        <p>Build USSD applications for feature phones and smartphones.</p>
        <div className="placeholder-features">
          <div className="feature">
            <h4>USSD Sessions</h4>
            <p>Create and manage USSD sessions</p>
          </div>
          <div className="feature">
            <h4>Menu Navigation</h4>
            <p>Build interactive menu structures</p>
          </div>
          <div className="feature">
            <h4>Operator Support</h4>
            <p>Works with all telecom operators</p>
          </div>
        </div>
        <button className="btn-coming-soon">Coming Soon</button>
      </div>
    </ServiceLayout>
  );
}
