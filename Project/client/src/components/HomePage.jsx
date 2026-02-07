"use client";

import React from "react";
import "./HomePage.css";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";

export default function HomePage() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  const services = [
    {
      id: "sms-campaign",
      name: "SMS Campaign",
      description: "Create, manage, and send SMS campaigns to your audience.",
      icon: "📱",
      color: "#667eea",
      path: "/services/sms-campaign",
      badge: "Popular",
    },
    {
      id: "payments",
      name: "Payments",
      description:
        "Accept and process payments securely via multiple channels.",
      icon: "💳",
      color: "#764ba2",
      path: "/services/payments",
    },
    {
      id: "airtime",
      name: "Airtime",
      description: "Top up mobile airtime for your customers instantly.",
      icon: "📡",
      color: "#f093fb",
      path: "/services/airtime",
    },
    {
      id: "voice",
      name: "Voice",
      description: "Make and receive voice calls programmatically.",
      icon: "☎️",
      color: "#4facfe",
      path: "/services/voice",
    },
    {
      id: "ussd",
      name: "USSD",
      description:
        "Build USSD applications for feature phones and smartphones.",
      icon: "⌨️",
      color: "#43e97b",
      path: "/services/ussd",
    },
  ];

  const handleServiceClick = (service) => {
    if (isAuthenticated) {
      navigate(service.path);
    } else {
      navigate("/login", { state: { returnTo: service.path } });
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">CAMPGER</h1>
            {/* <p className="tagline">Communication Management Gateway</p> */}
          </div>
          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Welcome, {user?.name}!</span>
                <div>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/register" className="btn-register">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <h2>Powerful Communication Tools</h2>
          <p>
            Everything you need to reach your customers across multiple channels
          </p>
        </section>

        <section className="services-section">
          <h3>Our Services</h3>
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card"
                style={{
                  borderTopColor: service.color,
                  opacity: service.comingSoon ? 0.7 : 1,
                }}
              >
                <div className="service-icon">{service.icon}</div>
                {service.badge && (
                  <span className="service-badge">{service.badge}</span>
                )}

                <h4>{service.name}</h4>
                <p>{service.description}</p>
                <button
                  onClick={() => handleServiceClick(service)}
                  className="btn-service"
                  style={{ backgroundColor: service.color }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h3>Why Choose CAMGER?</h3>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <h4>Fast & Reliable</h4>
              <p>Built for performance with 99.9% uptime guarantee</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h4>Secure</h4>
              <p>Enterprise-grade security with data encryption</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <h4>Analytics</h4>
              <p>Real-time insights and detailed reporting</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🤝</div>
              <h4>Support</h4>
              <p>24/7 customer support and dedicated account managers</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 CAMGER. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
