"use client";

import React from "react";
import {
  getStatusColor,
  canSendCampaign,
  canEditCampaign,
  formatCampaignDate,
  getStatValue,
} from "../utils/campaignUtils";
import "./CampaignCard.css";

/**
 * CampaignCard - A reusable component for displaying campaign information
 *
 * @param {Object} campaign - Campaign data object
 * @param {Object} actions - Action callbacks: { onSend, onEdit, onDelete }
 * @param {Object} options - Display options: { showStats, showActions, showDescription }
 */
export default function CampaignCard({ campaign, actions = {}, options = {} }) {
  const { onSend, onDelete, onEdit } = actions;

  const {
    showStats = true,
    showActions = true,
    showDescription = true,
    showDate = true,
    showMessage = true,
  } = options;

  return (
    <div className="campaign-card">
      <div className="card-header">
        <h3>{campaign.name}</h3>
        <span
          className="status-badge"
          style={{ backgroundColor: getStatusColor(campaign.status) }}
        >
          {campaign.status}
        </span>
      </div>

      {showDescription && (
        <p className="card-description">
          {campaign.description || "No description"}
        </p>
      )}

      {showStats && campaign.stats && (
        <div className="card-stats">
          <div className="stat">
            <span className="stat-label">Total Recipients</span>
            <span className="stat-value">
              {getStatValue(campaign.stats, "totalRecipients")}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Sent</span>
            <span className="stat-value">
              {getStatValue(campaign.stats, "sent")}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Failed</span>
            <span className="stat-value">
              {getStatValue(campaign.stats, "failed")}
            </span>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="card-message">
          <p className="message-preview">{campaign.message}</p>
        </div>
      )}

      {showDate && campaign.createdAt && (
        <div className="card-dates">
          <small>Created: {formatCampaignDate(campaign.createdAt)}</small>
        </div>
      )}

      {showActions && (onSend || onEdit || onDelete) && (
        <div className="card-actions">
          {onSend && canSendCampaign(campaign) && (
            <button onClick={onSend} className="btn-send">
              Send Campaign
            </button>
          )}
          {onEdit && canEditCampaign(campaign) && (
            <button onClick={onEdit} className="btn-edit">
              Edit
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="btn-delete">
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
