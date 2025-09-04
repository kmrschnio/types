import { UserRole, UserStatus } from '../enums';

/**
 * User entity interface
 * Represents a user in the system
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's email address (primary identifier) */
  email: string;
  /** User's first name */
  firstName?: string;
  /** User's last name */
  lastName?: string;
  /** User's role in the system */
  role: UserRole;
  /** User's status */
  status: UserStatus;
  /** Whether the user account is active */
  isActive: boolean;
  /** Account creation timestamp (ISO string) */
  createdAt: string;
  /** Last account update timestamp (ISO string) */
  updatedAt: string;
  /** Last login timestamp (ISO string) */
  lastLoginAt?: string;
  /** User's phone number */
  phone?: string;
  /** User's profile picture URL */
  profilePicture?: string;
  /** User's timezone */
  timezone?: string;
  /** User's preferred language */
  language?: string;
}

/**
 * User profile interface
 * Extended user information for profile management
 */
export interface UserProfile extends User {
  /** User's date of birth */
  dateOfBirth?: string;
  /** User's address */
  address?: string;
  /** User's city */
  city?: string;
  /** User's state */
  state?: string;
  /** User's country */
  country?: string;
  /** User's postal code */
  postalCode?: string;
  /** User's emergency contact */
  emergencyContact?: string;
  /** User's preferences */
  preferences?: UserPreferences;
}

/**
 * User preferences interface
 * User's system preferences and settings
 */
export interface UserPreferences {
  /** Email notification preferences */
  emailNotifications: boolean;
  /** SMS notification preferences */
  smsNotifications: boolean;
  /** Push notification preferences */
  pushNotifications: boolean;
  /** Preferred notification time */
  notificationTime?: string;
  /** Theme preference */
  theme: 'light' | 'dark' | 'auto';
  /** Language preference */
  language: string;
  /** Timezone preference */
  timezone: string;
}
