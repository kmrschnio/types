import { LoanStatus, LoanPurpose, CreditScoreRange } from '../enums';

/**
 * Loan application entity interface
 * Represents a loan application in the system
 */
export interface LoanApplication {
  /** Unique loan application identifier */
  id: string;
  /** Associated customer ID */
  customerId: string;
  /** Loan amount requested */
  loanAmount: number;
  /** Loan term in months */
  loanTerm: number;
  /** Interest rate (annual percentage) */
  interestRate: number;
  /** Loan purpose */
  purpose?: LoanPurpose;
  /** Loan application status */
  status: LoanStatus;
  /** Customer's credit score */
  creditScore?: number;
  /** Credit score range */
  creditScoreRange?: CreditScoreRange;
  /** Loan approval reason */
  approvalReason?: string;
  /** Loan rejection reason */
  rejectionReason?: string;
  /** ID of the user who approved the loan */
  approvedById?: string;
  /** Loan approval timestamp (ISO string) */
  approvedAt?: string;
  /** Loan disbursement timestamp (ISO string) */
  disbursedAt?: string;
  /** Loan maturity date (ISO string) */
  maturityDate?: string;
  /** EMI amount */
  emiAmount?: number;
  /** Total interest amount */
  totalInterest?: number;
  /** Total amount to be repaid */
  totalAmount?: number;
  /** Loan application creation timestamp (ISO string) */
  createdAt: string;
  /** Last loan application update timestamp (ISO string) */
  updatedAt: string;
}

/**
 * Loan application details interface
 * Extended loan application information
 */
export interface LoanApplicationDetails extends LoanApplication {
  /** Associated customer information */
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  /** Loan officer information */
  loanOfficer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  /** Loan documents */
  documents?: LoanDocument[];
  /** Loan repayment schedule */
  repaymentSchedule?: RepaymentSchedule[];
  /** Loan application history */
  history?: LoanApplicationHistory[];
}

/**
 * Loan document interface
 * Represents documents associated with a loan application
 */
export interface LoanDocument {
  /** Unique document identifier */
  id: string;
  /** Document type */
  type: string;
  /** Document name */
  name: string;
  /** Document file URL */
  fileUrl: string;
  /** Document upload timestamp (ISO string) */
  uploadedAt: string;
  /** Document verification status */
  isVerified: boolean;
  /** Document verification timestamp (ISO string) */
  verifiedAt?: string;
}

/**
 * Repayment schedule interface
 * Represents the repayment schedule for a loan
 */
export interface RepaymentSchedule {
  /** Unique schedule entry identifier */
  id: string;
  /** Installment number */
  installmentNumber: number;
  /** Due date (ISO string) */
  dueDate: string;
  /** Principal amount */
  principalAmount: number;
  /** Interest amount */
  interestAmount: number;
  /** Total EMI amount */
  emiAmount: number;
  /** Outstanding principal */
  outstandingPrincipal: number;
  /** Payment status */
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  /** Payment timestamp (ISO string) */
  paidAt?: string;
  /** Late fee amount */
  lateFee?: number;
}

/**
 * Loan application history interface
 * Represents the history of changes to a loan application
 */
export interface LoanApplicationHistory {
  /** Unique history entry identifier */
  id: string;
  /** Action performed */
  action: string;
  /** Previous status */
  previousStatus?: LoanStatus;
  /** New status */
  newStatus?: LoanStatus;
  /** Action performed by user ID */
  performedBy: string;
  /** Action timestamp (ISO string) */
  performedAt: string;
  /** Additional notes */
  notes?: string;
}
