import { SortOrder } from '../enums';

/**
 * Pagination query interface
 * Standard pagination parameters for API queries
 */
export interface PaginationQuery {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
  /** Search query */
  search?: string;
  /** Additional filters */
  filters?: Record<string, any>;
}

/**
 * Paginated response interface
 * Standard response format for paginated data
 */
export interface PaginatedResponse<T> {
  /** Array of data items */
  data: T[];
  /** Pagination information */
  pagination: {
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
  };
}

/**
 * Sort configuration interface
 * Configuration for sorting data
 */
export interface SortConfig {
  /** Field to sort by */
  field: string;
  /** Sort order */
  order: SortOrder;
}

/**
 * Filter configuration interface
 * Configuration for filtering data
 */
export interface FilterConfig {
  /** Field to filter by */
  field: string;
  /** Filter operator */
  operator: FilterOperator;
  /** Filter value */
  value: any;
}

/**
 * Filter operator enumeration
 * Available operators for filtering
 */
export enum FilterOperator {
  /** Equals */
  EQUALS = 'equals',
  /** Not equals */
  NOT_EQUALS = 'not_equals',
  /** Greater than */
  GREATER_THAN = 'greater_than',
  /** Greater than or equal */
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
  /** Less than */
  LESS_THAN = 'less_than',
  /** Less than or equal */
  LESS_THAN_OR_EQUAL = 'less_than_or_equal',
  /** Contains */
  CONTAINS = 'contains',
  /** Not contains */
  NOT_CONTAINS = 'not_contains',
  /** Starts with */
  STARTS_WITH = 'starts_with',
  /** Ends with */
  ENDS_WITH = 'ends_with',
  /** In array */
  IN = 'in',
  /** Not in array */
  NOT_IN = 'not_in',
  /** Is null */
  IS_NULL = 'is_null',
  /** Is not null */
  IS_NOT_NULL = 'is_not_null',
  /** Between */
  BETWEEN = 'between',
  /** Date range */
  DATE_RANGE = 'date_range'
}
