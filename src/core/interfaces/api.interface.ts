/**
 * API response interface
 * Standard response format for all API endpoints
 */
export interface ApiResponse<T = any> {
  /** Response success status */
  success: boolean;
  /** Response data */
  data?: T;
  /** Response message */
  message?: string;
  /** Error information */
  error?: ApiError;
  /** Response metadata */
  metadata?: ApiMetadata;
  /** Response timestamp (ISO string) */
  timestamp: string;
}

/**
 * API error interface
 * Standard error format for API responses
 */
export interface ApiError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: Record<string, any>;
  /** Field-specific errors */
  fieldErrors?: FieldError[];
  /** Stack trace (development only) */
  stack?: string;
}

/**
 * Field error interface
 * Represents validation errors for specific fields
 */
export interface FieldError {
  /** Field name */
  field: string;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
  /** Rejected value */
  value?: any;
}

/**
 * API metadata interface
 * Additional metadata for API responses
 */
export interface ApiMetadata {
  /** Request ID */
  requestId?: string;
  /** Response time in milliseconds */
  responseTime?: number;
  /** API version */
  version?: string;
  /** Pagination information */
  pagination?: PaginationInfo;
}

/**
 * Pagination information interface
 * Pagination metadata for paginated responses
 */
export interface PaginationInfo {
  /** Current page number */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Whether there is a previous page */
  hasPrevious: boolean;
}
