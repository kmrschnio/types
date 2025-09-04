/**
 * User registration DTO
 * Data transfer object for user registration requests
 */
export interface RegisterDto {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** Password confirmation */
  confirmPassword: string;
  /** User's first name */
  firstName?: string;
  /** User's last name */
  lastName?: string;
  /** User's phone number */
  phone?: string;
  /** Terms and conditions acceptance */
  acceptTerms: boolean;
  /** Marketing communications consent */
  marketingConsent?: boolean;
}

/**
 * User registration response DTO
 * Data transfer object for registration responses
 */
export interface RegisterResponseDto {
  /** User information */
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    isActive: boolean;
  };
  /** Verification email sent status */
  verificationEmailSent: boolean;
  /** Welcome message */
  message: string;
}

/**
 * Email verification DTO
 * Data transfer object for email verification requests
 */
export interface EmailVerificationDto {
  /** Verification token */
  token: string;
  /** User's email address */
  email: string;
}

/**
 * Password reset request DTO
 * Data transfer object for password reset requests
 */
export interface PasswordResetRequestDto {
  /** User's email address */
  email: string;
}

/**
 * Password reset DTO
 * Data transfer object for password reset
 */
export interface PasswordResetDto {
  /** Reset token */
  token: string;
  /** New password */
  newPassword: string;
  /** Password confirmation */
  confirmPassword: string;
}
