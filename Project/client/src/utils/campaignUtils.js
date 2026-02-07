import {
  STATUS_COLORS,
  SENDABLE_STATUSES,
  EDITABLE_STATUSES,
  DATE_FORMAT_OPTIONS,
} from "../constants/campaignConstants";

/**
 * Get the color for a campaign status
 */
export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || STATUS_COLORS.draft;
};

/**
 * Check if a campaign can be sent
 */
export const canSendCampaign = (campaign) => {
  return SENDABLE_STATUSES.includes(campaign.status);
};

/**
 * Check if a campaign can be edited
 */
export const canEditCampaign = (campaign) => {
  return EDITABLE_STATUSES.includes(campaign.status);
};

/**
 * Format a date for display
 */
export const formatCampaignDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
};

/**
 * Get stat value with fallback to 0
 */
export const getStatValue = (stats, key, defaultValue = 0) => {
  return stats?.[key] || defaultValue;
};

/**
 * Calculate campaign progress percentage
 */
export const calculateProgress = (stats) => {
  if (!stats || stats.totalRecipients === 0) return 0;
  return Math.round((stats.sent / stats.totalRecipients) * 100);
};
