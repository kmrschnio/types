/**
 * KYC (Know Your Customer) status enumeration
 * Defines the different states of customer verification
 */
export enum KycStatus {
  /** KYC verification is pending */
  PENDING = 'pending',
  /** KYC verification is in progress */
  IN_PROGRESS = 'in_progress',
  /** KYC verification is completed and approved */
  VERIFIED = 'verified',
  /** KYC verification is rejected */
  REJECTED = 'rejected',
  /** KYC verification is expired */
  EXPIRED = 'expired'
}

/**
 * KYC document type enumeration
 * Defines the different types of KYC documents
 */
export enum KycDocumentType {
  /** PAN card document */
  PAN = 'pan',
  /** Aadhaar card document */
  AADHAAR = 'aadhaar',
  /** Address proof document */
  ADDRESS_PROOF = 'address_proof',
  /** Income proof document */
  INCOME_PROOF = 'income_proof',
  /** Bank statement document */
  BANK_STATEMENT = 'bank_statement',
  /** Salary slip document */
  SALARY_SLIP = 'salary_slip'
}

/**
 * KYC document status enumeration
 * Defines the status of individual KYC documents
 */
export enum KycDocumentStatus {
  /** Document is pending upload */
  PENDING = 'pending',
  /** Document is uploaded and under review */
  UNDER_REVIEW = 'under_review',
  /** Document is verified and approved */
  VERIFIED = 'verified',
  /** Document is rejected */
  REJECTED = 'rejected'
}
