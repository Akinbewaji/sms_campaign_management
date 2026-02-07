<!--
  CAMPAIGN CARD REUSABILITY GUIDE
-->

# CampaignCard - Reusable Component

The CampaignCard component has been refactored to be highly reusable across different parts of your application.

## Architecture Changes

### 1. **Extracted Constants** (`constants/campaignConstants.js`)

- `STATUS_COLORS` - Color mapping for campaign statuses
- `SENDABLE_STATUSES` - Statuses that can be sent
- `EDITABLE_STATUSES` - Statuses that can be edited
- `DATE_FORMAT_OPTIONS` - Date formatting configuration

### 2. **Utility Functions** (`utils/campaignUtils.js`)

- `getStatusColor(status)` - Get color for a status
- `canSendCampaign(campaign)` - Check if campaign can be sent
- `canEditCampaign(campaign)` - Check if campaign can be edited
- `formatCampaignDate(date)` - Format date for display
- `getStatValue(stats, key, defaultValue)` - Get stat value safely
- `calculateProgress(stats)` - Calculate campaign progress percentage

### 3. **Custom Hook** (`hooks/useCampaignActions.js`)

- `useCampaignActions(onCampaignUpdated, onCampaignDeleted)` - Encapsulates campaign action logic
- Returns: error, editingCampaign, handler functions

### 4. **Refactored CampaignCard** (`components/CampaignCard.jsx`)

- Now accepts `actions` and `options` objects
- More flexible and configurable
- Conditional rendering based on options

## Usage Examples

### Basic Usage (Full Featured)

```jsx
<CampaignCard
  campaign={campaignData}
  actions={{
    onSend: () => handleSend(campaignData._id),
    onEdit: () => handleEdit(campaignData),
    onDelete: () => handleDelete(campaignData._id),
  }}
  options={{
    showStats: true,
    showActions: true,
    showDescription: true,
    showDate: true,
    showMessage: true,
  }}
/>
```

### Minimal Display (View Only)

```jsx
<CampaignCard
  campaign={campaignData}
  actions={{}}
  options={{
    showStats: true,
    showActions: false,
    showDescription: true,
    showDate: true,
    showMessage: true,
  }}
/>
```

### Compact Card (No Stats or Message)

```jsx
<CampaignCard
  campaign={campaignData}
  actions={{
    onDelete: () => handleDelete(campaignData._id),
  }}
  options={{
    showStats: false,
    showActions: true,
    showDescription: true,
    showDate: false,
    showMessage: false,
  }}
/>
```

### With Custom Hook (Recommended for Lists)

```jsx
import { useCampaignActions } from "../hooks/useCampaignActions";

function MyComponent({ campaigns, onUpdate, onDelete }) {
  const {
    error,
    editingCampaign,
    handleSendCampaign,
    handleDeleteCampaign,
    handleEditCampaign,
    handleCampaignUpdated,
    handleCancelEdit,
  } = useCampaignActions(onUpdate, onDelete);

  return (
    <>
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign._id}
          campaign={campaign}
          actions={{
            onSend: () => handleSendCampaign(campaign._id),
            onEdit: () => handleEditCampaign(campaign),
            onDelete: () => handleDeleteCampaign(campaign._id),
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
      {editingCampaign && (
        <EditCampaign
          campaign={editingCampaign}
          onCampaignUpdated={handleCampaignUpdated}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
}
```

## Component Props

### `campaign` (required)

Campaign data object with properties:

- `_id` - Campaign ID
- `name` - Campaign name
- `description` - Campaign description
- `message` - SMS message content
- `status` - Campaign status (draft, scheduled, running, completed, paused)
- `stats` - Object with { totalRecipients, sent, failed }
- `createdAt` - Creation date

### `actions` (optional)

Object containing callback functions:

- `onSend(campaignId)` - Called when send button is clicked
- `onEdit(campaign)` - Called when edit button is clicked
- `onDelete(campaignId)` - Called when delete button is clicked

### `options` (optional)

Object controlling what to display:

- `showStats` (boolean, default: true)
- `showActions` (boolean, default: true)
- `showDescription` (boolean, default: true)
- `showDate` (boolean, default: true)
- `showMessage` (boolean, default: true)

## Benefits of Reusability

✅ **Separation of Concerns** - Business logic is in hooks and utils
✅ **Flexible Display** - Show/hide sections as needed
✅ **Reusable Logic** - Use the same hooks in different components
✅ **Easy Testing** - Isolated utilities and hooks are easier to test
✅ **Consistent Behavior** - State colors, date formatting, status checks are centralized
✅ **Scalability** - Easy to add new statuses or formats without changing components
