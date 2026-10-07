// Application constants

export const APP_NAME = 'Data Accuracy Improvement';
export const APP_TAGLINE = 'Data Quality Pipeline Portfolio Project';
export const SYNTHETIC_BADGE = 'SYNTHETIC DATA — PORTFOLIO DEMO';

export const PAGES = [
  { id: 'executive', label: 'Executive Summary', icon: 'layout-dashboard' },
  { id: 'raw', label: 'Raw Data Explorer', icon: 'database' },
  { id: 'validation', label: 'Validation Stage', icon: 'check-circle' },
  { id: 'cleaning', label: 'Cleaning Stage', icon: 'eraser' },
  { id: 'standardization', label: 'Standardization Stage', icon: 'align-left' },
  { id: 'deduplication', label: 'Deduplication Stage', icon: 'copy' },
  { id: 'quality', label: 'Quality Dashboard', icon: 'bar-chart-2' },
  { id: 'comparison', label: 'Before/After Comparison', icon: 'git-compare' },
  { id: 'issues', label: 'Issue Breakdown', icon: 'alert-triangle' },
  { id: 'about', label: 'About This Project', icon: 'info' },
] as const;

export const DEFAULT_FILTERS = {
  dateRange: { start: '2024-01-01', end: '2024-12-31' },
  issueCategories: [] as string[],
  stages: [] as string[],
};

export const PIPELINE_STAGES = [
  { id: 'raw', label: 'Raw Data', icon: 'database', color: 'neutral' },
  { id: 'validation', label: 'Validation', icon: 'check-circle', color: 'blue' },
  { id: 'cleaning', label: 'Cleaning', icon: 'eraser', color: 'amber' },
  { id: 'standardization', label: 'Standardization', icon: 'align-left', color: 'purple' },
  { id: 'deduplication', label: 'Deduplication', icon: 'copy', color: 'orange' },
  { id: 'quality_check', label: 'Quality Check', icon: 'check-circle-2', color: 'green' },
  { id: 'clean', label: 'Clean Dataset', icon: 'database', color: 'emerald' },
];

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

export const ACCURACY_TARGETS = {
  initial: 80,
  target: 96,
  stages: {
    raw: 80,
    validation: 85,
    cleaning: 90,
    standardization: 93,
    deduplication: 95,
    quality_check: 96,
    clean: 96,
  },
};