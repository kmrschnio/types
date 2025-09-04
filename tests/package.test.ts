/**
 * Test file to verify the shared-types package exports work correctly
 */

import {
  // Core entities
  User,
  Customer,
  LoanApplication,
  
  // Core enums
  UserRole,
  UserStatus,
  LoanStatus,
  
  // Core interfaces
  ApiResponse,
  PaginatedResponse,
  
  // Utility types
  DateString,
  UUID,
  EntityToDto,
  ValidationResult,
  ValidationError
} from '../src/index';

// Test that types are properly exported
describe('Shared Types Package', () => {
  it('should export core entities', () => {
    // This test just verifies the types are available
    const user: User = {
      id: '123',
      email: 'test@example.com',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(user.id).toBe('123');
    expect(user.role).toBe(UserRole.CUSTOMER);
  });

  it('should export enums with correct values', () => {
    expect(UserRole.ADMIN).toBe('admin');
    expect(UserRole.CUSTOMER).toBe('customer');
    expect(UserStatus.ACTIVE).toBe('active');
    expect(LoanStatus.PENDING).toBe('pending');
  });

  it('should export utility types', () => {
    const dateString: DateString = '2024-01-01T00:00:00.000Z';
    const uuid: UUID = '123e4567-e89b-12d3-a456-426614174000';
    
    expect(typeof dateString).toBe('string');
    expect(typeof uuid).toBe('string');
  });

  it('should export validation types', () => {
    const validationResult: ValidationResult<string> = {
      isValid: true,
      data: 'valid data'
    };
    
    const validationError: ValidationError = {
      field: 'email',
      message: 'Invalid email format',
      code: 'INVALID_EMAIL'
    };
    
    expect(validationResult.isValid).toBe(true);
    expect(validationError.field).toBe('email');
  });
});
