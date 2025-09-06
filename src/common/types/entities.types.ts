export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: import('./user-role.enum').UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  pan: string;
  aadhaar: string;
  address: string;
  income: number;
  kycStatus: import('./kyc-status.enum').KycStatus;
  kycVerificationData: import('../interfaces/kyc-verification-data.interface').KycVerificationData;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  purpose: string;
  status: import('./loan-status.enum').LoanStatus;
  creditScore: number;
  approvalReason: string;
  approvedById: string;
  approvedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Repayment {
  id: string;
  loanId: string;
  installmentNumber: number;
  dueDate: Date;
  amountDue: number;
  amountPaid: number;
  status: import('./repayment-status.enum').RepaymentStatus;
  paidAt: Date;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  repaymentId: string;
  paymentGateway: string;
  gatewayTransactionId: string;
  amount: number;
  status: import('./transaction-status.enum').TransactionStatus;
  paymentMethod: string;
  gatewayResponse: any;
  createdAt: Date;
}