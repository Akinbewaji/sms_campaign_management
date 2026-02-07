import { useState } from "react";
import { campaignService } from "../services/campaignService";

/**
 * Custom hook for managing campaign actions (send, edit, delete)
 * Encapsulates all campaign-related business logic
 */
export const useCampaignActions = (onCampaignUpdated, onCampaignDeleted) => {
  const [error, setError] = useState("");
  const [editingCampaign, setEditingCampaign] = useState(null);

  const handleSendCampaign = async (campaignId) => {
    try {
      setError("");
      const result = await campaignService.sendCampaign(campaignId);
      onCampaignUpdated(result.campaign);
    } catch (err) {
      setError(err.message || "Failed to send campaign");
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      setError("");
      await campaignService.deleteCampaign(campaignId);
      onCampaignDeleted(campaignId);
    } catch (err) {
      setError(err.message || "Failed to delete campaign");
    }
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
  };

  const handleCampaignUpdated = (updatedCampaign) => {
    onCampaignUpdated(updatedCampaign);
    setEditingCampaign(null);
  };

  const handleCancelEdit = () => {
    setEditingCampaign(null);
  };

  return {
    error,
    setError,
    editingCampaign,
    setEditingCampaign,
    handleSendCampaign,
    handleDeleteCampaign,
    handleEditCampaign,
    handleCampaignUpdated,
    handleCancelEdit,
  };
};
