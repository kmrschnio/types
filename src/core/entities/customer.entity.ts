import { KycStatus, KycDocumentType, KycDocumentStatus } from '../enums';

/**
 * Customer entity interface
 * Represents a customer in the system
 */
export interface Customer {
  /** Unique customer identifier */
  id: string;
  /** Associated user account ID */
  userId: string;
  /** Customer's first name */
  firstName: string;
  /** Customer's last name */
  lastName: string;
  /** Customer's email address */
  email: string;
  /** Customer's phone number */
  phone: string;
  /** Customer's PAN number */
  pan: string;
  /** Customer's Aadhaar number */
  aadhaar: string;
  /** Customer's address */
  address?: string;
  /** Customer's city */
  city?: string;
  /** Customer's state */
  state?: string;
  /** Customer's postal code */
  postalCode?: string;
  /** Customer's annual income */
  income?: number;
  /** Customer's occupation */
  occupation?: string;
  /** Customer's employer */
  employer?: string;
  /** Customer's KYC status */
  kycStatus: KycStatus;
  /** Customer's KYC documents */
  kycDocuments?: KycDocument[];
  /** Customer's bank account details */
  bankAccount?: BankAccount;
  /** Customer's credit score */
  creditScore?: number;
  /** Customer's risk rating */
  riskRating?: string;
  /** Customer creation timestamp (ISO string) */
  createdAt: string;
  /** Last customer update timestamp (ISO string) */
  updatedAt: string;
}

/**
 * KYC document interface
 * Represents a KYC document uploaded by the customer
 */
export interface KycDocument {
  /** Unique document identifier */
  id: string;
  /** Document type */
  type: KycDocumentType;
  /** Document file name */
  fileName: string;
  /** Document file URL */
  fileUrl: string;
  /** Document status */
  status: KycDocumentStatus;
  /** Document upload timestamp (ISO string) */
  uploadedAt: string;
  /** Document verification timestamp (ISO string) */
  verifiedAt?: string;
  /** Document expiry date (ISO string) */
  expiryDate?: string;
  /** Document verification notes */
  verificationNotes?: string;
  /** Document file size in bytes */
  fileSize?: number;
  /** Document MIME type */
  mimeType?: string;
}

/**
 * Bank account interface
 * Represents customer's bank account information
 */
export interface BankAccount {
  /** Bank account ID */
  id: string;
  /** Bank name */
  bankName: string;
  /** Bank account number */
  accountNumber: string;
  /** Bank account holder name */
  accountHolderName: string;
  /** Bank IFSC code */
  ifscCode: string;
  /** Bank branch name */
  branchName?: string;
  /** Bank account type */
  accountType: 'savings' | 'current' | 'salary';
  /** Whether this is the primary account */
  isPrimary: boolean;
  /** Account verification status */
  isVerified: boolean;
  /** Account creation timestamp (ISO string) */
  createdAt: string;
  /** Last account update timestamp (ISO string) */
  updatedAt: string;
}
