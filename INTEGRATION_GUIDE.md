# Integration Guide

This guide explains how to integrate the `@your-org/shared-types` package into your backend and frontend applications.

## Installation

### Option 1: Local Development (Recommended for now)

```bash
# In your project directory
npm install ../shared-types
# or
npm install ./shared-types
```

### Option 2: Published Package (When ready)

```bash
npm install @your-org/shared-types
```

## Backend Integration (Node.js/Express)

### 1. Basic Setup

```typescript
// src/types/index.ts
export * from '@your-org/shared-types';

// Or import specific types
import { 
  User, 
  UserRole, 
  ApiResponse, 
  ValidationResult 
} from '@your-org/shared-types';
```

### 2. Entity Usage

```typescript
// src/entities/user.entity.ts
import { User, UserRole, UserStatus } from '@your-org/shared-types';

export class UserEntity implements User {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<User>) {
    this.id = data.id || '';
    this.email = data.email || '';
    this.role = data.role || UserRole.CUSTOMER;
    this.status = data.status || UserStatus.ACTIVE;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}
```

### 3. DTO Usage

```typescript
// src/dto/user.dto.ts
import { 
  LoginDto, 
  RegisterDto, 
  UserResponseDto 
} from '@your-org/shared-types';

export class AuthService {
  async login(credentials: LoginDto): Promise<UserResponseDto> {
    // Implementation
  }

  async register(userData: RegisterDto): Promise<UserResponseDto> {
    // Implementation
  }
}
```

### 4. API Response Usage

```typescript
// src/controllers/user.controller.ts
import { 
  ApiResponse, 
  SuccessResponse, 
  ErrorResponse,
  User 
} from '@your-org/shared-types';

export class UserController {
  async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      const user = await this.userService.findById(id);
      return {
        success: true,
        data: user,
        message: 'User retrieved successfully'
      } as SuccessResponse<User>;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        }
      } as ErrorResponse;
    }
  }
}
```

### 5. Validation Usage

```typescript
// src/validation/user.validation.ts
import { 
  ValidationResult, 
  ValidationError 
} from '@your-org/shared-types';

export class UserValidator {
  validateEmail(email: string): ValidationResult<string> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        errors: [{
          field: 'email',
          message: 'Invalid email format',
          code: 'INVALID_EMAIL',
          value: email
        }]
      };
    }

    return {
      isValid: true,
      data: email
    };
  }
}
```

## Frontend Integration (React/TypeScript)

### 1. Basic Setup

```typescript
// src/types/index.ts
export * from '@your-org/shared-types';
```

### 2. Component Usage

```typescript
// src/components/UserProfile.tsx
import React from 'react';
import { User, UserRole, UserStatus } from '@your-org/shared-types';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h2>{user.email}</h2>
      <p>Role: {user.role}</p>
      <p>Status: {user.status}</p>
    </div>
  );
};
```

### 3. API Service Usage

```typescript
// src/services/api.service.ts
import { 
  ApiResponse, 
  User, 
  LoginDto, 
  RegisterDto 
} from '@your-org/shared-types';

export class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL;

  async login(credentials: LoginDto): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    return response.json();
  }

  async register(userData: RegisterDto): Promise<ApiResponse<User>> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return response.json();
  }
}
```

### 4. Form Validation Usage

```typescript
// src/hooks/useFormValidation.ts
import { useState } from 'react';
import { ValidationResult, ValidationError } from '@your-org/shared-types';

export const useFormValidation = <T>(initialData: T) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validate = (validationFn: (data: T) => ValidationResult<T>) => {
    const result = validationFn(data);
    setErrors(result.errors || []);
    return result.isValid;
  };

  return {
    data,
    setData,
    errors,
    validate
  };
};
```

## Utility Types Usage

### 1. Date Transformation

```typescript
import { EntityToDto, DtoToEntity, DateString } from '@your-org/shared-types';

// Convert entity to DTO (for API responses)
const userEntity: User = {
  id: '123',
  email: 'test@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
};

const userDto: EntityToDto<User> = {
  ...userEntity,
  createdAt: userEntity.createdAt.toISOString() as DateString,
  updatedAt: userEntity.updatedAt.toISOString() as DateString
};

// Convert DTO to entity (for database operations)
const userFromApi: EntityToDto<User> = {
  id: '123',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
};

const userEntity: DtoToEntity<User> = {
  ...userFromApi,
  createdAt: new Date(userFromApi.createdAt),
  updatedAt: new Date(userFromApi.updatedAt)
};
```

### 2. UUID Usage

```typescript
import { UUID } from '@your-org/shared-types';

const generateId = (): UUID => {
  return crypto.randomUUID();
};

const userId: UUID = generateId();
```

## Best Practices

### 1. Type Safety
- Always use the shared types instead of defining your own
- Import only what you need to keep bundle size small
- Use utility types for transformations

### 2. Validation
- Use the provided validation types for consistent error handling
- Implement validation on both frontend and backend
- Use the same validation rules across applications

### 3. API Consistency
- Use the shared API response types
- Follow the same error handling patterns
- Use consistent status codes and error messages

### 4. Development Workflow
- Update shared types when adding new features
- Run tests after updating types
- Use semantic versioning for type changes

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure the package is properly installed
2. **Type Mismatches**: Ensure you're using the latest version of the package
3. **Build Errors**: Check that your TypeScript configuration is compatible

### Getting Help

- Check the package documentation
- Review the test files for usage examples
- Ensure all dependencies are up to date