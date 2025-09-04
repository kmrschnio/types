import { FieldError } from "./api.interface";

/**
 * Standard response interface
 * Base interface for all API responses
 */
export interface BaseResponse {
  /** Response success status */
  success: boolean;
  /** Response message */
  message?: string;
  /** Response timestamp (ISO string) */
  timestamp: string;
}

/**
 * Success response interface
 * Standard format for successful API responses
 */
export interface SuccessResponse<T = any> extends BaseResponse {
  /** Response success status (always true) */
  success: true;
  /** Response data */
  data: T;
  /** Response metadata */
  metadata?: ResponseMetadata;
}

/**
 * Error response interface
 * Standard format for error API responses
 */
export interface ErrorResponse extends BaseResponse {
  /** Response success status (always false) */
  success: false;
  /** Error information */
  error: ErrorInfo;
  /** Response metadata */
  metadata?: ResponseMetadata;
}

/**
 * Error information interface
 * Detailed error information
 */
export interface ErrorInfo {
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
 * Response metadata interface
 * Additional metadata for responses
 */
export interface ResponseMetadata {
  /** Request ID */
  requestId?: string;
  /** Response time in milliseconds */
  responseTime?: number;
  /** API version */
  version?: string;
  /** Additional metadata */
  [key: string]: any;
}
