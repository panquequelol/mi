// Detect if the user is on a phone (not tablet)
// Uses user agent and screen size for better detection
export const isPhone = (): boolean => {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent;

  // Check for mobile user agents
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  // Check for tablets (we want to exclude these)
  const isTablet = /Tablet|iPad/i.test(userAgent);

  // Additional check: use screen width to distinguish phones from tablets
  // Most tablets have width >= 768px
  const hasPhoneWidth = window.innerWidth < 768;

  return isMobile && !isTablet && hasPhoneWidth;
};
