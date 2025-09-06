export type ReportType = 'payment_analytics' | 'overdue_loans' | 'loan_summary' | 'repayment_performance';
export type ExportFormat = 'json' | 'csv' | 'pdf';

interface ReportFilters {
  reportType: ReportType;
  startDate: string;
  endDate: string;
  customerId?: string;
}

interface ExportFilters extends ReportFilters {
  format: ExportFormat;
}

// Define the structure of report data returned from the API
interface ReportApiResponse {
  generatedAt?: string;
  [key: string]: any; // Allow for additional report-specific data
}

export interface ReportData {
  type: ReportType;
  data: ReportApiResponse;
  generatedAt: string;
  dateRange: { startDate: string; endDate: string };
}
