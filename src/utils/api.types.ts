/**
 * API endpoint configuration interface
 * Configuration for API endpoints
 */
export interface ApiEndpoint {
  /** Endpoint path */
  path: string;
  /** HTTP method */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Endpoint description */
  description?: string;
  /** Required permissions */
  permissions?: string[];
  /** Required roles */
  roles?: string[];
  /** Request validation schema */
  validationSchema?: any;
  /** Response type */
  responseType?: any;
}

/**
 * API client configuration interface
 * Configuration for API clients
 */
export interface ApiClientConfig {
  /** Base URL */
  baseUrl: string;
  /** Default headers */
  defaultHeaders?: Record<string, string>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Authentication token */
  authToken?: string;
  /** API version */
  version?: string;
  /** Retry configuration */
  retry?: RetryConfig;
}

/**
 * Retry configuration interface
 * Configuration for request retries
 */
export interface RetryConfig {
  /** Maximum number of retries */
  maxRetries: number;
  /** Retry delay in milliseconds */
  delay: number;
  /** Retry delay multiplier */
  delayMultiplier?: number;
  /** Maximum retry delay in milliseconds */
  maxDelay?: number;
  /** Retry condition function */
  retryCondition?: (error: any) => boolean;
}

/**
 * API request interface
 * Standard API request format
 */
export interface ApiRequest<T = any> {
  /** Request data */
  data?: T;
  /** Request parameters */
  params?: Record<string, any>;
  /** Request headers */
  headers?: Record<string, string>;
  /** Request timeout */
  timeout?: number;
}

/**
 * API response interface
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  /** Response data */
  data: T;
  /** Response status */
  status: number;
  /** Response headers */
  headers: Record<string, string>;
  /** Response metadata */
  metadata?: Record<string, any>;
}
