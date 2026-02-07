"use client";

import React from "react";
import ServiceLayout from "./ServiceLayout";
import "./ServicePlaceholder.css";

export default function PaymentsService() {
  return (
    <ServiceLayout serviceName="Payments">
      <div className="service-placeholder">
        <div className="placeholder-icon">💳</div>
        <h2>Payments Service</h2>
        <p>Accept and process payments securely via multiple channels.</p>
        <div className="placeholder-features">
          <div className="feature">
            <h4>Card Payments</h4>
            <p>Accept Mastercard, Visa, and local cards</p>
          </div>
          <div className="feature">
            <h4>Mobile Money</h4>
            <p>Integration with major mobile money providers</p>
          </div>
          <div className="feature">
            <h4>Bank Transfers</h4>
            <p>Direct bank transfers and settlements</p>
          </div>
        </div>
        <button className="btn-coming-soon">Coming Soon</button>
      </div>
    </ServiceLayout>
  );
}
