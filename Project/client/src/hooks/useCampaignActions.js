import { useState } from "react";
import { campaignService } from "../services/campaignService";

/**
 * Custom hook for managing campaign actions (send, edit, delete)
 * Encapsulates all campaign-related business logic
 */
export const useCampaignActions = (
  onCampaignUpdated,
  onCampaignDeleted,
  onCampaignCreated,
) => {
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

  const handleRerunCampaign = async (campaign) => {
    try {
      setError("");
      // Create a copy of the campaign with a new name to indicate rerun
      const newCampaignData = {
        name: `${campaign.name} (Rerun)`,
        description: campaign.description,
        message: campaign.message,
        recipients: campaign.recipients || campaign.targetList || [],
        // copy other relevant fields if present
        settings: campaign.settings || {},
      };

      const createResult =
        await campaignService.createCampaign(newCampaignData);
      const createdCampaign = createResult.campaign;

      // Try to send immediately
      const sendResult = await campaignService.sendCampaign(
        createdCampaign._id,
      );
      const sentCampaign = sendResult.campaign;

      if (onCampaignCreated) onCampaignCreated(sentCampaign);
    } catch (err) {
      setError(err.message || "Failed to rerun campaign");
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
    handleRerunCampaign,
  };
};
