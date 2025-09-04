/**
 * Refresh token request DTO
 * Data transfer object for refresh token requests
 */
export interface RefreshTokenDto {
  /** Refresh token */
  refreshToken: string;
}

/**
 * Refresh token response DTO
 * Data transfer object for refresh token responses
 */
export interface RefreshTokenResponseDto {
  /** New access token */
  accessToken: string;
  /** New refresh token */
  refreshToken: string;
  /** Token expiration time in seconds */
  expiresIn: number;
  /** Token type */
  tokenType: string;
}

/**
 * Token validation DTO
 * Data transfer object for token validation
 */
export interface TokenValidationDto {
  /** Access token to validate */
  accessToken: string;
}

/**
 * Token validation response DTO
 * Data transfer object for token validation responses
 */
export interface TokenValidationResponseDto {
  /** Token validity status */
  isValid: boolean;
  /** User information (if token is valid) */
  user?: {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
  };
  /** Token expiration time */
  expiresAt?: string;
  /** Error message (if token is invalid) */
  error?: string;
}
