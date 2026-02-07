"use client";

import React from "react";
import { useCampaignActions } from "../hooks/useCampaignActions";
import CampaignCard from "./CampaignCard";
import EditCampaign from "./EditCampaign";
import "./CampaignList.css";

export default function CampaignList({
  campaigns,
  onCampaignUpdated,
  onCampaignDeleted,
  onCampaignCreated,
}) {
  const {
    error,
    editingCampaign,
    handleSendCampaign,
    handleDeleteCampaign,
    handleEditCampaign,
    handleRerunCampaign,
    handleCampaignUpdated,
    handleCancelEdit,
  } = useCampaignActions(
    onCampaignUpdated,
    onCampaignDeleted,
    onCampaignCreated,
  );

  if (campaigns.length === 0) {
    return (
      <div className="no-campaigns">
        No campaigns yet. Create your first campaign!
      </div>
    );
  }

  return (
    <div className="campaign-list">
      {error && <div className="error-message">{error}</div>}
      {editingCampaign && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditCampaign
              campaign={editingCampaign}
              onCampaignUpdated={handleCampaignUpdated}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
      <div className="campaigns-grid">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            actions={{
              onSend: () => handleSendCampaign(campaign._id),
              onEdit: () => handleEditCampaign(campaign),
              onDelete: () => handleDeleteCampaign(campaign._id),
              onRerun: () => handleRerunCampaign(campaign),
            }}
            options={{
              showStats: true,
              showActions: true,
              showDescription: true,
              showDate: true,
              showMessage: true,
            }}
          />
        ))}
      </div>
    </div>
  );
}
