/**
 * User role enumeration
 * Defines the different types of users in the system
 */
export enum UserRole {
  /** Regular customer with loan access */
  CUSTOMER = 'customer',
  /** System administrator with full access */
  ADMIN = 'admin',
  /** Loan officer with approval capabilities */
  LOAN_OFFICER = 'loan_officer'
}

/**
 * User status enumeration
 * Defines the different states a user account can be in
 */
export enum UserStatus {
  /** User account is active and can access the system */
  ACTIVE = 'active',
  /** User account is inactive and cannot access the system */
  INACTIVE = 'inactive',
  /** User account is suspended temporarily */
  SUSPENDED = 'suspended',
  /** User account is pending verification */
  PENDING = 'pending'
}
