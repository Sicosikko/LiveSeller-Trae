
/**
 * Checks if the current application is running on a specific subdomain
 * @param subdomain The subdomain to check for
 * @returns boolean indicating if the current hostname matches the subdomain
 */
export const isSubdomain = (subdomain: string): boolean => {
  // Get the current hostname
  const hostname = window.location.hostname;
  
  // For localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Check URL path instead for local development simulation
    return window.location.pathname.startsWith(`/${subdomain}`);
  }
  
  // Check if it's an IP address (for development/testing)
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    return false;
  }
  
  // For production, check the actual subdomain
  const parts = hostname.split('.');
  
  // Must have at least 3 parts (subdomain.domain.tld)
  if (parts.length < 3) {
    return false;
  }
  
  return parts[0] === subdomain;
};

/**
 * Gets the primary domain from the current hostname
 * @returns The primary domain without subdomain
 */
export const getPrimaryDomain = (): string => {
  const hostname = window.location.hostname;
  
  // For localhost or IP, return as is
  if (hostname === 'localhost' || 
      hostname === '127.0.0.1' ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    return hostname;
  }
  
  // Extract domain from hostname (remove subdomain if present)
  const parts = hostname.split('.');
  if (parts.length < 2) {
    return hostname;
  }
  
  // For domains with standard TLDs, return domain.tld
  if (parts.length === 3) {
    return parts.slice(1).join('.');
  }
  
  // Handle more complex cases like co.uk
  return hostname.replace(/^[^.]+\./, '');
};

/**
 * Gets the app URL with the proper subdomain
 * @returns The correct URL for the app
 */
export const getAppUrl = (): string => {
  // For local development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(window.location.hostname)) {
    return `${window.location.protocol}//${window.location.host}/app`;
  }
  
  const primaryDomain = getPrimaryDomain();
  return `${window.location.protocol}//app.${primaryDomain}`;
};

/**
 * Gets the landing page URL
 * @returns The correct URL for the landing page
 */
export const getLandingUrl = (): string => {
  // For local development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(window.location.hostname)) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  const primaryDomain = getPrimaryDomain();
  return `${window.location.protocol}//${primaryDomain}`;
};
