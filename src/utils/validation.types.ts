/**
 * Validation result interface
 * Represents the result of a validation operation
 */
export interface ValidationResult<T = any> {
  /** Whether the validation passed */
  isValid: boolean;
  /** Validated data */
  data?: T;
  /** Validation errors */
  errors?: ValidationError[];
}

/**
 * Validation error interface
 * Represents a validation error
 */
export interface ValidationError {
  /** Field that failed validation */
  field: string;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
  /** Rejected value */
  value?: any;
  /** Additional error details */
  details?: Record<string, any>;
}

/**
 * Validation rule interface
 * Represents a validation rule
 */
export interface ValidationRule {
  /** Rule name */
  name: string;
  /** Rule description */
  description: string;
  /** Validation function */
  validate: (value: any, context?: any) => boolean | Promise<boolean>;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
}

/**
 * Validation context interface
 * Context information for validation
 */
export interface ValidationContext {
  /** Field being validated */
  field: string;
  /** Parent object */
  parent?: any;
  /** Validation options */
  options?: Record<string, any>;
  /** Custom validation data */
  customData?: Record<string, any>;
}
