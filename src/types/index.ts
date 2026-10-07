// Core data types for Data Accuracy Improvement

export interface RawBooking {
  booking_id: string;
  customer_id: string;
  customer_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  hotel_name: string;
  check_in: string;
  check_out: string;
  nights: number;
  room_type: string;
  booking_date: string;
  amount: number;
  currency: string;
  payment_status: string;
  booking_channel: string;
}

export interface CleanBooking {
  booking_id: string;
  customer_id: string;
  customer_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  hotel_name: string;
  check_in: string; // ISO format YYYY-MM-DD
  check_out: string; // ISO format YYYY-MM-DD
  nights: number;
  room_type: string;
  booking_date: string; // ISO format YYYY-MM-DD
  amount: number;
  currency: string;
  payment_status: string;
  booking_channel: string;
}

export interface QualityMetrics {
  stage: string;
  records_in: number;
  records_out: number;
  issues_fixed: number;
  accuracy_pct: number;
  duration_ms: number;
}

export interface IssueBreakdown {
  category: string;
  count: number;
  percentage: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  examples: string[];
}

export interface BeforeAfterRecord {
  field: string;
  before: string;
  after: string;
  issue_type: string;
}

export interface KPICardData {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  format?: 'number' | 'percentage' | 'currency' | 'days';
  description?: string;
  icon?: React.ReactNode;
}

export interface InsightCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'finding' | 'opportunity' | 'risk' | 'success';
  metric?: string;
  value?: string;
}

export interface RecommendationCard {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
  related_page?: string;
}

export interface FilterState {
  dateRange: { start: string; end: string };
  issueCategories: string[];
  stages: string[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  input_records: number;
  output_records: number;
  issues_fixed: number;
  accuracy_before: number;
  accuracy_after: number;
  duration_ms: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export const STAGES = [
  'raw',
  'validation',
  'cleaning',
  'standardization',
  'deduplication',
  'quality_check',
  'clean',
] as const;

export const STAGE_LABELS: Record<string, string> = {
  raw: 'Raw Data',
  validation: 'Validation',
  cleaning: 'Cleaning',
  standardization: 'Standardization',
  deduplication: 'Deduplication',
  quality_check: 'Quality Check',
  clean: 'Clean Dataset',
};

export const ISSUE_CATEGORIES = [
  'Missing Values',
  'Duplicate Records',
  'Incorrect Date Formats',
  'Invalid Categories',
  'Inconsistent Names',
  'Incorrect Casing',
  'Invalid Numeric Values',
  'Outliers',
  'Missing IDs',
  'Currency Mismatch',
];

export const ROOM_TYPES = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];
export const PAYMENT_STATUSES = ['Paid', 'Pending', 'Failed', 'Refunded', 'Cancelled'];
export const BOOKING_CHANNELS = ['Web', 'Mobile', 'Agent', 'Phone', 'Email'];
export const COUNTRIES = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'UAE', 'India'];