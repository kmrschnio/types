/**
 * Payment status enumeration
 * Defines the different states of a payment transaction
 */
export enum PaymentStatus {
  /** Payment is initiated but not yet processed */
  PENDING = 'pending',
  /** Payment is being processed */
  PROCESSING = 'processing',
  /** Payment is successful */
  SUCCESS = 'success',
  /** Payment has failed */
  FAILED = 'failed',
  /** Payment is cancelled */
  CANCELLED = 'cancelled',
  /** Payment is refunded */
  REFUNDED = 'refunded',
  /** Payment is partially refunded */
  PARTIALLY_REFUNDED = 'partially_refunded'
}

/**
 * Payment method enumeration
 * Defines the different payment methods available
 */
export enum PaymentMethod {
  /** Credit card payment */
  CREDIT_CARD = 'credit_card',
  /** Debit card payment */
  DEBIT_CARD = 'debit_card',
  /** Net banking payment */
  NET_BANKING = 'net_banking',
  /** UPI payment */
  UPI = 'upi',
  /** Wallet payment */
  WALLET = 'wallet',
  /** Bank transfer */
  BANK_TRANSFER = 'bank_transfer',
  /** Cash payment */
  CASH = 'cash',
  /** Cheque payment */
  CHEQUE = 'cheque'
}

/**
 * Payment gateway enumeration
 * Defines the different payment gateways integrated
 */
export enum PaymentGateway {
  /** Razorpay payment gateway */
  RAZORPAY = 'razorpay',
  /** PayU payment gateway */
  PAYU = 'payu',
  /** Paytm payment gateway */
  PAYTM = 'paytm',
  /** Stripe payment gateway */
  STRIPE = 'stripe',
  /** Cashfree payment gateway */
  CASHFREE = 'cashfree'
}

/**
 * Transaction type enumeration
 * Defines the different types of transactions
 */
export enum TransactionType {
  /** Loan disbursement */
  LOAN_DISBURSEMENT = 'loan_disbursement',
  /** EMI payment */
  EMI_PAYMENT = 'emi_payment',
  /** Prepayment */
  PREPAYMENT = 'prepayment',
  /** Late fee payment */
  LATE_FEE = 'late_fee',
  /** Processing fee */
  PROCESSING_FEE = 'processing_fee',
  /** Refund */
  REFUND = 'refund'
}

/**
 * Repayment status enumeration
 * Defines the different states of loan repayments
 */
export enum RepaymentStatus {
  /** Repayment is pending */
  PENDING = 'pending',
  /** Repayment is due */
  DUE = 'due',
  /** Repayment is overdue */
  OVERDUE = 'overdue',
  /** Repayment is completed */
  COMPLETED = 'completed',
  /** Repayment is partially paid */
  PARTIAL = 'partial',
  /** Repayment is waived */
  WAIVED = 'waived'
}
