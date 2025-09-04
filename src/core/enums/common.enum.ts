/**
 * Common status enumeration
 * Generic status values used across the system
 */
export enum CommonStatus {
  /** Active state */
  ACTIVE = 'active',
  /** Inactive state */
  INACTIVE = 'inactive',
  /** Pending state */
  PENDING = 'pending',
  /** Completed state */
  COMPLETED = 'completed',
  /** Failed state */
  FAILED = 'failed',
  /** Cancelled state */
  CANCELLED = 'cancelled'
}

/**
 * Sort order enumeration
 * Defines the sort order for queries
 */
export enum SortOrder {
  /** Ascending order */
  ASC = 'asc',
  /** Descending order */
  DESC = 'desc'
}

/**
 * Export format enumeration
 * Defines the different formats for data export
 */
export enum ExportFormat {
  /** CSV format */
  CSV = 'csv',
  /** Excel format */
  EXCEL = 'excel',
  /** PDF format */
  PDF = 'pdf',
  /** JSON format */
  JSON = 'json'
}

/**
 * Notification type enumeration
 * Defines the different types of notifications
 */
export enum NotificationType {
  /** Email notification */
  EMAIL = 'email',
  /** SMS notification */
  SMS = 'sms',
  /** Push notification */
  PUSH = 'push',
  /** In-app notification */
  IN_APP = 'in_app'
}

/**
 * Priority level enumeration
 * Defines the different priority levels
 */
export enum Priority {
  /** Low priority */
  LOW = 'low',
  /** Medium priority */
  MEDIUM = 'medium',
  /** High priority */
  HIGH = 'high',
  /** Critical priority */
  CRITICAL = 'critical'
}
