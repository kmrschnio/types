# @your-org/shared-types

Shared TypeScript types, interfaces, and DTOs for the loan management system. This package provides a centralized collection of all types used across backend and frontend applications, ensuring consistency and type safety.

## Features

- 🏗️ **Centralized Types**: All types, interfaces, and DTOs in one place
- 🔄 **Consistency**: Ensures type consistency across backend and frontend
- 📦 **Modular**: Organized by modules (auth, customer, loan, payment, admin)
- 🛡️ **Type Safety**: Full TypeScript support with strict typing
- 🔧 **Validation**: Built-in validation types and utilities
- 📚 **Documentation**: Comprehensive type documentation
- 🚀 **Automation**: Automated type extraction and validation

## Installation

```bash
# Install in your project
npm install @your-org/shared-types

# Or with yarn
yarn add @your-org/shared-types
```

## Usage

### Basic Usage

```typescript
import { User, UserRole, LoginDto, ApiResponse } from '@your-org/shared-types';

// Use types in your application
const user: User = {
  id: '123',
  email: 'user@example.com',
  role: UserRole.CUSTOMER,
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

// Use DTOs for API requests
const loginData: LoginDto = {
  email: 'user@example.com',
  password: 'password123'
};

// Use response types
const response: ApiResponse<User> = {
  success: true,
  data: user,
  timestamp: '2024-01-01T00:00:00Z'
};
```

### Module-Specific Imports

```typescript
// Import specific modules
import { LoginDto, RegisterDto } from '@your-org/shared-types/modules/auth';
import { Customer, KycStatus } from '@your-org/shared-types/core';
import { ValidationResult } from '@your-org/shared-types/utils';

// Use in your application
const customer: Customer = {
  id: '123',
  userId: '456',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  pan: 'ABCDE1234F',
  aadhaar: '123456789012',
  kycStatus: KycStatus.PENDING,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};
```

### Backend Integration

```typescript
// backend/src/auth/auth.controller.ts
import { LoginDto, LoginResponseDto, ApiResponse } from '@your-org/shared-types';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<LoginResponseDto>> {
    // Implementation
    return {
      success: true,
      data: {
        user: { /* user data */ },
        accessToken: 'token',
        refreshToken: 'refresh',
        expiresIn: 3600,
        tokenType: 'Bearer'
      },
      timestamp: new Date().toISOString()
    };
  }
}
```

### Frontend Integration

```typescript
// frontend/src/types/index.ts
export * from '@your-org/shared-types';

// Or import specific types
import { User, Customer, LoanApplication } from '@your-org/shared-types';

// Use in React components
interface UserProfileProps {
  user: User;
  customer: Customer;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, customer }) => {
  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>KYC Status: {customer.kycStatus}</p>
    </div>
  );
};
```

## Package Structure

```
@your-org/shared-types/
├── core/                    # Core business types
│   ├── entities/           # Entity interfaces
│   ├── enums/             # Business enums
│   └── interfaces/        # Core interfaces
├── modules/               # Module-specific types
│   ├── auth/             # Authentication types
│   ├── customer/         # Customer types
│   ├── loan/             # Loan types
│   ├── payment/          # Payment types
│   ├── admin/            # Admin types
│   └── common/           # Common types
└── utils/                # Utility types
```

## Available Types

### Core Entities

- **User**: User account information
- **Customer**: Customer profile and KYC data
- **LoanApplication**: Loan application details
- **Repayment**: Loan repayment information
- **Transaction**: Financial transaction data

### Core Enums

- **UserRole**: User roles (CUSTOMER, ADMIN, LOAN_OFFICER)
- **KycStatus**: KYC verification status
- **LoanStatus**: Loan application status
- **PaymentStatus**: Payment transaction status
- **TransactionType**: Transaction types

### Core Interfaces

- **ApiResponse**: Standard API response format
- **PaginatedResponse**: Paginated data response
- **SuccessResponse**: Success response format
- **ErrorResponse**: Error response format

### Utility Types

- **DateString**: ISO 8601 date string type
- **UUID**: Universally unique identifier type
- **EntityToDto**: Entity to DTO transformation
- **ValidationResult**: Validation result type

## Development

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- TypeScript >= 4.9.0

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/shared-types.git
cd shared-types

# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Available Scripts

```bash
# Build the package
npm run build

# Build in watch mode
npm run build:watch

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check

# Extract types from source projects
npm run extract-types

# Validate type consistency
npm run validate-consistency

# Generate documentation
npm run generate-docs

# Clean build artifacts
npm run clean

# Release new version
npm run release
```

### Type Extraction

The package includes automated scripts to extract types from both backend and frontend applications:

```bash
# Extract types from source projects
npm run extract-types

# Validate extracted types
npm run validate-consistency
```

### Adding New Types

1. **Create the type definition** in the appropriate module directory
2. **Export the type** from the module's index file
3. **Update the main index** to export the new type
4. **Run validation** to ensure consistency
5. **Update documentation** if needed

Example:

```typescript
// src/modules/customer/dto/new-customer.dto.ts
export interface NewCustomerDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// src/modules/customer/dto/index.ts
export * from './new-customer.dto';

// src/modules/customer/index.ts
export * from './dto';

// src/modules/index.ts
export * from './customer';

// src/index.ts
export * from './modules';
```

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes in type definitions
- **MINOR**: New types or non-breaking changes
- **PATCH**: Documentation fixes or minor corrections

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the validation scripts
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue on GitHub
- Contact the development team
- Check the documentation

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and updates.
