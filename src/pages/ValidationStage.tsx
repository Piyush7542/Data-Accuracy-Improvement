import { CheckCircle, AlertTriangle, XCircle, Clock, Search, Filter, X, Database, Hash, Zap, Target } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { IssueCard } from '@/components/dashboard/IssueCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';

export function ValidationStage() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { metrics, issues, loading, error } = useQualityData();
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

  const validationMetrics = metrics.find(m => m.stage === 'validation') || metrics[1];
  const recordsIn = validationMetrics?.records_in || 10000;
  const recordsOut = validationMetrics?.records_out || 9500;
  const issuesFixed = validationMetrics?.issues_fixed || 500;

  // Validation-specific issues
  const validationIssues = [
    { category: 'Schema Violations', count: 200, percentage: 2.0, severity: 'high' as const, examples: ['booking_id: expected string, got null', 'nights: expected integer, got string'] },
    { category: 'Type Mismatches', count: 180, percentage: 1.8, severity: 'high' as const, examples: ['amount: expected number, got string "$450"', 'check_in: expected date, got "Jan 15"'] },
    { category: 'Range Violations', count: 120, percentage: 1.2, severity: 'medium' as const, examples: ['nights: -5 (negative)', 'amount: 0', 'check_out before check_in'] },
    { category: 'Format Violations', count: 200, percentage: 2.0, severity: 'high' as const, examples: ['date: "15/01/2024" (DD/MM/YYYY)', 'phone: "555-0123" (no country code)'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Validation Stage</h1>
            <span className="badge badge-success">Completed</span>
          </div>
          <p className="text-neutral-600 mt-1">Schema validation, type checking, and range validation for all records</p>
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
        <KPICard label="Issues Fixed" value={issuesFixed} format="number" change={5} icon={<Zap className="w-8 h-8" />} />
        <KPICard label="Accuracy" value={92} format="percentage" trend="up" change={12} icon={<Target className="w-8 h-8" />} />
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Validation Checks</h2>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search checks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input pl-8 w-48"
            />
          </div>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            {[
              { name: 'Required Fields Present', status: 'passed', description: 'booking_id, customer_id, hotel_name, check_in, check_out, amount, currency', records: 9500 },
              { name: 'Data Types Valid', status: 'partial', description: 'amount, nights, dates must be correct types', records: 9620 },
              { name: 'Date Format Valid', status: 'failed', description: 'ISO 8601 (YYYY-MM-DD) required', records: 8000 },
              { name: 'Range Checks', status: 'partial', description: 'nights > 0, amount > 0, check_out > check_in', records: 9700 },
              { name: 'Enum Values Valid', status: 'failed', description: 'room_type, payment_status, booking_channel in allowed lists', records: 9300 },
              { name: 'Currency Code Valid', status: 'failed', description: 'ISO 4217 currency codes only', records: 9800 },
              { name: 'Cross-field Consistency', status: 'partial', description: 'currency matches amount format, country matches city', records: 9400 },
              { name: 'Referential Integrity', status: 'passed', description: 'customer_id exists in customer table', records: 9500 },
            ].map((check, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    check.status === 'passed' ? 'bg-green-100 text-green-600' :
                    check.status === 'partial' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {check.status === 'passed' && <CheckCircle className="w-5 h-5" />}
                    {check.status === 'partial' && <Clock className="w-5 h-5" />}
                    {check.status === 'failed' && <XCircle className="w-5 h-5" />}
                  </span>
                  <div>
                    <h4 className="font-medium text-neutral-900">{check.name}</h4>
                    <p className="text-sm text-neutral-600">{check.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg text-neutral-900">{formatNumber(check.records)} / 10,000</p>
                  <p className="text-xs text-neutral-500">{formatPercentage(check.records / 100)} passed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Issues Found</h2>
        </div>
        <div className="card-body">
          {validationIssues.map((issue, i) => (
            <IssueCard key={i} issue={issue} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}