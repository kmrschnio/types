import { TransactionType, PaymentStatus, PaymentMethod, PaymentGateway } from '../enums';

/**
 * Transaction entity interface
 * Represents a financial transaction in the system
 */
export interface Transaction {
  /** Unique transaction identifier */
  id: string;
  /** Transaction type */
  type: TransactionType;
  /** Transaction amount */
  amount: number;
  /** Transaction status */
  status: PaymentStatus;
  /** Payment method used */
  paymentMethod?: PaymentMethod;
  /** Payment gateway used */
  paymentGateway?: PaymentGateway;
  /** Gateway transaction ID */
  gatewayTransactionId?: string;
  /** Transaction reference number */
  referenceNumber?: string;
  /** Transaction description */
  description?: string;
  /** Associated loan ID (if applicable) */
  loanId?: string;
  /** Associated customer ID */
  customerId: string;
  /** Transaction fees */
  fees?: number;
  /** Net amount after fees */
  netAmount?: number;
  /** Transaction timestamp (ISO string) */
  transactionDate: string;
  /** Transaction settlement date (ISO string) */
  settlementDate?: string;
  /** Transaction creation timestamp (ISO string) */
  createdAt: string;
  /** Last transaction update timestamp (ISO string) */
  updatedAt: string;
}

/**
 * Transaction details interface
 * Extended transaction information
 */
export interface TransactionDetails extends Transaction {
  /** Customer information */
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  /** Loan information (if applicable) */
  loan?: {
    id: string;
    loanAmount: number;
    loanTerm: number;
    interestRate: number;
  };
  /** Payment gateway response */
  gatewayResponse?: GatewayResponse;
  /** Transaction history */
  history?: TransactionHistory[];
}

/**
 * Gateway response interface
 * Represents the response from payment gateway
 */
export interface GatewayResponse {
  /** Gateway response status */
  status: string;
  /** Gateway response code */
  code?: string;
  /** Gateway response message */
  message?: string;
  /** Gateway transaction ID */
  transactionId?: string;
  /** Gateway reference ID */
  referenceId?: string;
  /** Gateway response data */
  data?: Record<string, any>;
  /** Response timestamp (ISO string) */
  timestamp: string;
}

/**
 * Transaction history interface
 * Represents the history of changes to a transaction
 */
export interface TransactionHistory {
  /** Unique history entry identifier */
  id: string;
  /** Action performed */
  action: string;
  /** Previous status */
  previousStatus?: PaymentStatus;
  /** New status */
  newStatus?: PaymentStatus;
  /** Action performed by user ID */
  performedBy: string;
  /** Action timestamp (ISO string) */
  performedAt: string;
  /** Additional notes */
  notes?: string;
}
