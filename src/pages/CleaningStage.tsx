import { Eraser, Zap, Database, CheckCircle, AlertTriangle, Trash2, Edit3, MinusCircle, Target } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { IssueCard } from '@/components/dashboard/IssueCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';

export function CleaningStage() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { metrics, loading, error } = useQualityData();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-red-600">Error loading data: {error}</p>
      </div>
    );
  }

  const cleaningMetrics = metrics.find(m => m.stage === 'cleaning') || metrics[2];
  const recordsIn = cleaningMetrics?.records_in || 9500;
  const recordsOut = cleaningMetrics?.records_out || 9200;
  const issuesFixed = cleaningMetrics?.issues_fixed || 300;

  const cleaningIssues = [
    { category: 'Missing Values Imputed', count: 1200, percentage: 12.0, severity: 'high' as const, examples: ['email: imputed from customer table', 'phone: generated placeholder'] },
    { category: 'Negative Values Corrected', count: 80, percentage: 0.8, severity: 'critical' as const, examples: ['nights: -5 → 3 (median)', 'amount: -50 → 300 (category avg)'] },
    { category: 'Zero Amounts Handled', count: 45, percentage: 0.45, severity: 'high' as const, examples: ['amount: 0 → category average'] },
    { category: 'Outliers Capped', count: 12, percentage: 0.12, severity: 'medium' as const, examples: ['nights: 365 → 30 (99th percentile)', 'amount: $100,000 → $2,000 (99th percentile)'] },
    { category: 'Duplicate Whitespace Removed', count: 450, percentage: 4.5, severity: 'low' as const, examples: ['customer_name: "John  Smith" → "John Smith"'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Eraser className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Cleaning Stage</h1>
            <span className="badge badge-warning">Completed</span>
          </div>
          <p className="text-neutral-600 mt-1">Handle missing values, correct invalid data, remove outliers and normalize whitespace</p>
        </div>
        <FilterBar
          filters={filters}
          onChange={useFilters().setFilters}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard label="Records In" value={recordsIn} format="number" icon={<Database className="w-8 h-8" />} />
        <KPICard label="Records Out" value={recordsOut} format="number" icon={<CheckCircle className="w-8 h-8" />} />
        <KPICard label="Issues Fixed" value={issuesFixed} format="number" change={8} icon={<Zap className="w-8 h-8" />} />
        <KPICard label="Accuracy" value={94} format="percentage" trend="up" change={2} icon={<Target className="w-8 h-8" />} />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Cleaning Operations</h2>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            {[
              { name: 'Missing Value Imputation', icon: Edit3, color: 'blue', operations: ['email: 800 imputed from customer profile', 'phone: 400 generated with country code', 'city: 300 from hotel location'] },
              { name: 'Negative Value Correction', icon: AlertTriangle, color: 'red', operations: ['nights: 80 corrected to median (3)', 'amount: 45 corrected to category avg'] },
              { name: 'Zero Amount Replacement', icon: MinusCircle, color: 'amber', operations: ['45 zero amounts → category average'] },
              { name: 'Outlier Capping (99th pct)', icon: Trash2, color: 'orange', operations: ['nights: 12 capped at 30', 'amount: 12 capped at $2,000'] },
              { name: 'Whitespace Normalization', icon: Edit3, color: 'green', operations: ['450 double spaces removed', 'leading/trailing spaces trimmed'] },
              { name: 'Test Data Removal', icon: Trash2, color: 'red', operations: ['50 test bookings identified and removed'] },
            ].map((op, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-lg flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${op.color}-100 text-${op.color}-600`}>
                  <op.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">{op.name}</h4>
                  <ul className="space-y-1 mt-2 text-sm text-neutral-600">
                    {op.operations.map((o, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="badge badge-primary ml-4">{op.operations.length} ops</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Issues Fixed</h2>
        </div>
        <div className="card-body">
          {cleaningIssues.map((issue, i) => (
            <IssueCard key={i} issue={issue} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}