import { RepaymentStatus, PaymentStatus, PaymentMethod } from '../enums';

/**
 * Repayment entity interface
 * Represents a loan repayment in the system
 */
export interface Repayment {
  /** Unique repayment identifier */
  id: string;
  /** Associated loan application ID */
  loanId: string;
  /** Repayment amount */
  amount: number;
  /** Repayment due date (ISO string) */
  dueDate: string;
  /** Repayment status */
  status: RepaymentStatus;
  /** Payment method used */
  paymentMethod?: PaymentMethod;
  /** Payment status */
  paymentStatus?: PaymentStatus;
  /** Payment timestamp (ISO string) */
  paidAt?: string;
  /** Late fee amount */
  lateFee?: number;
  /** Interest amount */
  interestAmount?: number;
  /** Principal amount */
  principalAmount?: number;
  /** Outstanding balance after payment */
  outstandingBalance?: number;
  /** Payment transaction ID */
  transactionId?: string;
  /** Payment gateway reference */
  gatewayReference?: string;
  /** Repayment creation timestamp (ISO string) */
  createdAt: string;
  /** Last repayment update timestamp (ISO string) */
  updatedAt: string;
}

/**
 * Repayment details interface
 * Extended repayment information
 */
export interface RepaymentDetails extends Repayment {
  /** Associated loan application information */
  loan: {
    id: string;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
    customerId: string;
  };
  /** Customer information */
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  /** Payment transaction details */
  transaction?: PaymentTransaction;
  /** Repayment history */
  history?: RepaymentHistory[];
}

/**
 * Payment transaction interface
 * Represents a payment transaction
 */
export interface PaymentTransaction {
  /** Unique transaction identifier */
  id: string;
  /** Transaction amount */
  amount: number;
  /** Payment method */
  paymentMethod: PaymentMethod;
  /** Payment status */
  status: PaymentStatus;
  /** Payment gateway */
  gateway: string;
  /** Gateway transaction ID */
  gatewayTransactionId?: string;
  /** Transaction timestamp (ISO string) */
  transactionDate: string;
  /** Transaction fees */
  fees?: number;
  /** Transaction notes */
  notes?: string;
}

/**
 * Repayment history interface
 * Represents the history of changes to a repayment
 */
export interface RepaymentHistory {
  /** Unique history entry identifier */
  id: string;
  /** Action performed */
  action: string;
  /** Previous status */
  previousStatus?: RepaymentStatus;
  /** New status */
  newStatus?: RepaymentStatus;
  /** Action performed by user ID */
  performedBy: string;
  /** Action timestamp (ISO string) */
  performedAt: string;
  /** Additional notes */
  notes?: string;
}
