"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceLayout.css";

export default function ServiceLayout({ serviceName, children }) {
  const navigate = useNavigate();

  return (
    <div className="service-layout">
      <header className="service-header">
        <div className="service-header-content">
          <div className="service-breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-home">
              ← Back to Services
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{serviceName}</span>
          </div>
        </div>
      </header>

      <main className="service-main">{children}</main>
    </div>
  );
}
