// Common types for the Loan Management System

export enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  LOAN_OFFICER = 'loan_officer'
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pan: string;
  aadhaar: string;
  address?: string;
  income?: number;
  kycStatus: 'pending' | 'verified' | 'rejected';
  kycDocuments?: KYCDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface KYCDocument {
  id: string;
  type: 'pan' | 'aadhaar' | 'income_proof' | 'address_proof';
  filename: string;
  url: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
}

export interface LoanApplication {
  id: string;
  customerId: string;
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  purpose?: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  creditScore?: number;
  approvalReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Repayment {
  id: string;
  loanId: string;
  installmentNumber: number;
  dueDate: string;
  amountDue: number;
  amountPaid: number;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  paidAt?: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  repaymentId: string;
  paymentGateway: string;
  gatewayTransactionId?: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethod?: string;
  gatewayResponse?: any;
  createdAt: string;
}

export interface AuthResponse {
  tokens: any;
  refreshToken(arg0: string, refreshToken: any): unknown;
  user(user: any): string | null | undefined;
  customer: any;
  accessToken(arg0: string, accessToken: any): unknown;
  success: boolean;
  message: string;
  data: {
    user: User,
    customer: Customer,
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaymentGatewayResponse {
  success: boolean;
  transactionId: string;
  amount: number;
  status: string;
  gatewayResponse: any;
}

export interface PaymentLink {
  paymentUrl: string;
  gatewayTransactionId: string;
  transactionId: string;
  paymentGateway: string;
  amount: number;
  expiresAt?: string;
}

export interface PaymentStatus {
  transactionId: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  amount: number;
  gatewayTransactionId: string;
  paymentGateway: string;
  paymentMethod?: string;
  createdAt: string;
  completedAt?: string;
  gatewayResponse?: any;
}

export interface PaymentHistory {
  transactions: PaymentStatus[];
  total: number;
  page: number;
  limit: number;
}

export interface PaymentSummary {
  totalPaid: number;
  totalDue: number;
  remainingBalance: number;
  completedInstallments: number;
  totalInstallments: number;
  nextDueDate?: string;
  nextDueAmount?: number;
  loanStatus: string;
}

export interface CreatePaymentRequest {
  repaymentId: string;
  amount: number;
  paymentGateway: 'razorpay' | 'stripe';
  paymentMethod?: string;
  customerEmail?: string;
  customerPhone?: string;
}