/**
 * Loan status enumeration
 * Defines the different states of a loan application
 */
export enum LoanStatus {
  /** Loan application is submitted and pending review */
  PENDING = 'pending',
  /** Loan application is under review */
  UNDER_REVIEW = 'under_review',
  /** Loan application is approved */
  APPROVED = 'approved',
  /** Loan application is rejected */
  REJECTED = 'rejected',
  /** Loan is disbursed to customer */
  DISBURSED = 'disbursed',
  /** Loan is active and being repaid */
  ACTIVE = 'active',
  /** Loan is completed (fully repaid) */
  COMPLETED = 'completed',
  /** Loan is defaulted */
  DEFAULTED = 'defaulted',
  /** Loan is closed */
  CLOSED = 'closed'
}

/**
 * Loan purpose enumeration
 * Defines the different purposes for which loans can be taken
 */
export enum LoanPurpose {
  /** Personal loan */
  PERSONAL = 'personal',
  /** Home loan */
  HOME = 'home',
  /** Vehicle loan */
  VEHICLE = 'vehicle',
  /** Education loan */
  EDUCATION = 'education',
  /** Business loan */
  BUSINESS = 'business',
  /** Medical emergency loan */
  MEDICAL = 'medical',
  /** Wedding loan */
  WEDDING = 'wedding',
  /** Debt consolidation loan */
  DEBT_CONSOLIDATION = 'debt_consolidation'
}

/**
 * Credit score range enumeration
 * Defines the different credit score ranges
 */
export enum CreditScoreRange {
  /** Excellent credit score (750+) */
  EXCELLENT = 'excellent',
  /** Good credit score (700-749) */
  GOOD = 'good',
  /** Fair credit score (650-699) */
  FAIR = 'fair',
  /** Poor credit score (600-649) */
  POOR = 'poor',
  /** Very poor credit score (<600) */
  VERY_POOR = 'very_poor'
}
