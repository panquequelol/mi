export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `updated ${diffMins}m ago`;
  if (diffHours < 24) return `updated ${diffHours}h ago`;
  if (diffDays === 1) return "updated yesterday";
  if (diffDays < 7) return `updated ${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function formatArchiveTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "archived just now";
  if (diffMins < 60) return `archived ${diffMins}m ago`;
  if (diffHours < 24) return `archived ${diffHours}h ago`;
  if (diffDays === 1) return "archived yesterday";
  if (diffDays < 7) return `archived ${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
