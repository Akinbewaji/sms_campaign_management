// Campaign status colors
export const STATUS_COLORS = {
  draft: "#999",
  scheduled: "#ff9800",
  running: "#2196f3",
  completed: "#4caf50",
  paused: "#f44336",
};

// Campaign statuses that can be sent
export const SENDABLE_STATUSES = ["draft", "scheduled"];

// Campaign statuses that can be edited
export const EDITABLE_STATUSES = ["draft"];

// Date formatting options
export const DATE_FORMAT_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
