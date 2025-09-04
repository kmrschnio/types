/**
 * Login request DTO
 * Data transfer object for user login requests
 */
export interface LoginDto {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** Remember me flag */
  rememberMe?: boolean;
  /** Device information */
  deviceInfo?: DeviceInfo;
}

/**
 * Login response DTO
 * Data transfer object for login responses
 */
export interface LoginResponseDto {
  /** User information */
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    isActive: boolean;
  };
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** Token expiration time in seconds */
  expiresIn: number;
  /** Token type */
  tokenType: string;
}

/**
 * Device information interface
 * Information about the device used for login
 */
export interface DeviceInfo {
  /** Device type */
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  /** Device name */
  deviceName?: string;
  /** Operating system */
  operatingSystem?: string;
  /** Browser information */
  browser?: string;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}
