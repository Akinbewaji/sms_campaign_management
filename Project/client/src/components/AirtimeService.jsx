"use client";

import React from "react";
import ServiceLayout from "./ServiceLayout";
import "./ServicePlaceholder.css";

export default function AirtimeService() {
  return (
    <ServiceLayout serviceName="Airtime">
      <div className="service-placeholder">
        <div className="placeholder-icon">📡</div>
        <h2>Airtime Service</h2>
        <p>Top up mobile airtime for your customers instantly.</p>
        <div className="placeholder-features">
          <div className="feature">
            <h4>Multiple Operators</h4>
            <p>Support for all major telecom operators</p>
          </div>
          <div className="feature">
            <h4>Instant Delivery</h4>
            <p>Airtime delivered in seconds</p>
          </div>
          <div className="feature">
            <h4>Bulk Operations</h4>
            <p>Top up multiple numbers at once</p>
          </div>
        </div>
        <button className="btn-coming-soon">Coming Soon</button>
      </div>
    </ServiceLayout>
  );
}
