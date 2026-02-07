"use client";

import React, { useState, useEffect } from "react";
import { campaignService } from "../services/campaignService";
import "./CreateCampaign.css";

export default function EditCampaign({
  campaign,
  onCampaignUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    message: "",
    recipients: "",
    scheduledTime: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || "",
        description: campaign.description || "",
        message: campaign.message || "",
        recipients: campaign.recipients?.join(",\n") || "",
        scheduledTime: campaign.scheduledTime || "",
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const recipientsList = formData.recipients
        .split(/[,\n]/)
        .map((phone) => phone.trim())
        .filter((phone) => phone.length > 0);

      if (recipientsList.length === 0) {
        setError("Please enter at least one recipient");
        setLoading(false);
        return;
      }

      const campaignData = {
        name: formData.name,
        description: formData.description,
        message: formData.message,
        recipients: recipientsList,
        ...(formData.scheduledTime && {
          scheduledTime: formData.scheduledTime,
        }),
      };

      const updatedCampaign = await campaignService.updateCampaign(
        campaign._id,
        campaignData,
      );
      onCampaignUpdated(updatedCampaign);
    } catch (err) {
      setError(err.message || "Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-campaign">
      <div className="form-container">
        <div className="form-header">
          <h2>Edit Campaign</h2>
          <button onClick={onCancel} className="btn-close">
            ✕
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Campaign Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter campaign description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your SMS message"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipients">Recipients *</label>
            <textarea
              id="recipients"
              name="recipients"
              value={formData.recipients}
              onChange={handleChange}
              placeholder="Enter phone numbers (comma or newline separated)"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="scheduledTime">Schedule Time (Optional)</label>
            <input
              type="datetime-local"
              id="scheduledTime"
              name="scheduledTime"
              value={formData.scheduledTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Updating..." : "Update Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
