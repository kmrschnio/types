// Token Manager Types and Interfaces

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: 'Bearer';
}

export interface TokenPayload {
  sub: string;          // User ID
  email: string;        // User email
  role: string;         // User role
  permissions: string[]; // User permissions
  iat: number;          // Issued at
  exp: number;          // Expires at
  jti: string;          // JWT ID
}

export interface TokenValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  expiresAt?: Date;
  payload?: TokenPayload;
}

export interface RefreshResult {
  success: boolean;
  newTokens?: TokenPair;
  error?: string;
  shouldLogout: boolean;
}

export interface TokenDebugInfo {
  format: 'valid' | 'invalid' | 'malformed';
  parts: string[];
  header: any;
  payload: any;
  signature: string;
  isExpired: boolean;
  timeToExpiry: number;
  issuer?: string;
  audience?: string;
}

export interface ValidationReport {
  accessToken: TokenValidationResult;
  refreshToken: TokenValidationResult;
  storageIntegrity: {
    isValid: boolean;
    issues: string[];
  };
  recommendations: string[];
}

export enum AuthErrorType {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  REFRESH_FAILED = 'REFRESH_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  RATE_LIMITED = 'RATE_LIMITED',
  STORAGE_ERROR = 'STORAGE_ERROR'
}

export interface AuthException {
  type: AuthErrorType;
  message: string;
  userMessage: string;
  shouldRetry: boolean;
  shouldLogout: boolean;
  retryAfter?: number;
  context: any;
}

export interface TokenManager {
  // Token validation and parsing
  validateToken(token: string): TokenValidationResult;
  parseToken(token: string): TokenPayload | null;
  isTokenExpired(token: string): boolean;
  
  // Token refresh with retry logic
  refreshToken(): Promise<RefreshResult>;
  scheduleTokenRefresh(): void;
  cancelTokenRefresh(): void;
  
  // Storage management
  storeTokens(tokens: TokenPair): void;
  clearTokens(): void;
  getStoredTokens(): TokenPair | null;
  
  // Debug utilities
  getTokenDebugInfo(token?: string): TokenDebugInfo;
  validateStoredTokens(): ValidationReport;
  
  // Event handling
  onTokenRefresh(callback: (result: RefreshResult) => void): void;
  onTokenExpired(callback: () => void): void;
}