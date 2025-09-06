export interface KycVerificationData {
  provider: string; // e.g., 'karza', 'signzy', 'bureau_id'
  requestId: string;
  verifiedAt?: Date;
  rejectionReason?: string;
  verificationScore?: number;
  panVerified: boolean;
  aadhaarVerified: boolean;
}