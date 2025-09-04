/**
 * @your-org/shared-types
 * 
 * Shared TypeScript types, interfaces, and DTOs for loan management system
 * 
 * This package provides a centralized collection of all types used across
 * the backend and frontend applications, ensuring consistency and type safety.
 */

// Core types (entities, enums, interfaces)
export * from './core';

// Module-specific types
export * from './modules';

// Utility types
export * from './utils';

// Re-export commonly used types for convenience
export type {
  // Core entities
  User,
  UserProfile,
  Customer,
  LoanApplication,
  Repayment,
  Transaction,
  
  // Core enums
  UserRole,
  UserStatus,
  KycStatus,
  LoanStatus,
  PaymentStatus,
  TransactionType,
  
  // Core interfaces
  ApiResponse,
  PaginatedResponse,
  SuccessResponse,
  ErrorResponse
} from './core';

export type {
  // Utility types
  DateString,
  UUID,
  EntityToDto,
  DtoToEntity,
  ValidationResult,
  ValidationError
} from './utils';
