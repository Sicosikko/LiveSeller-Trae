
/**
 * Utility to manage developer access to the SaaS platform
 * This allows the creators of the SaaS to have admin permissions for testing
 */

// List of developer email addresses that should receive admin access
// In a real production environment, this should be secured and not hardcoded
const developerEmails: string[] = [
  "dev@whatzappflow.com",
  "admin@whatzappflow.com",
  "founder@whatzappflow.com",
  "desenvolvimento@whatzappflow.com",
  "desenvolvedor@whatzappflow.com",
  "tech@whatzappflow.com",
  "cto@whatzappflow.com",
  "developer@whatzappflow.com",
  "gleisson2114@gmail.com", // Developer email
  // Add more developer emails as needed
];

/**
 * Checks if a given email belongs to a developer account
 * @param email The email to check
 * @returns Boolean indicating if this is a developer account
 */
export const isDeveloperAccount = (email: string): boolean => {
  if (!email) return false;
  return developerEmails.includes(email.toLowerCase());
};

/**
 * Ensures a user has admin role if they're a developer
 * @param user The user object to check
 * @returns The updated user object with developer privileges if applicable
 */
export const ensureDeveloperPrivileges = <T extends { email?: string; role?: string }>(user: T | null): T | null => {
  if (!user || !user.email) return user;
  
  // If this is a developer account, ensure they have admin role
  if (isDeveloperAccount(user.email)) {
    return {
      ...user,
      role: "admin" // Ensure developer always has admin role
    };
  }
  
  return user;
};