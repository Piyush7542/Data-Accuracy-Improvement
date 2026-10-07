import { Copy, Zap, Database, CheckCircle, AlertTriangle, Trash2, MinusCircle, Eye, Users, Target } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { IssueCard } from '@/components/dashboard/IssueCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';

export function DeduplicationStage() {
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

  const dedupMetrics = metrics.find(m => m.stage === 'deduplication') || metrics[4];
  const recordsIn = dedupMetrics?.records_in || 9200;
  const recordsOut = dedupMetrics?.records_out || 8800;
  const issuesFixed = dedupMetrics?.issues_fixed || 400;
  const duplicatesRemoved = recordsIn - recordsOut;

  const dedupIssues = [
    { category: 'Exact Duplicates', count: 200, percentage: 2.0, severity: 'high' as const, examples: ['Same customer, same dates, same hotel, same amount'] },
    { category: 'Near Duplicates (Fuzzy)', count: 150, percentage: 1.5, severity: 'high' as const, examples: ['Same customer, dates ±1 day, same hotel', 'Minor name variations (John/Jhon Smith)'] },
    { category: 'Cross-Channel Duplicates', count: 50, percentage: 0.5, severity: 'medium' as const, examples: ['Same booking via Web and Mobile'] },
    { category: 'Test Data Duplicates', count: 20, percentage: 0.2, severity: 'low' as const, examples: ['Test bookings with same fake data'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Copy className="w-6 h-6 text-orange-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Deduplication Stage</h1>
            <span className="badge badge-orange">Completed</span>
          </div>
          <p className="text-neutral-600 mt-1">Remove exact and near-duplicate bookings using exact and fuzzy matching</p>
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
        <KPICard label="Duplicates Removed" value={duplicatesRemoved} format="number" trend="down" change={-5} icon={<Trash2 className="w-8 h-8" />} />
        <KPICard label="Accuracy" value={96} format="percentage" trend="up" change={1} icon={<Target className="w-8 h-8" />} />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Deduplication Methods</h2>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {[
              { 
                name: 'Exact Match Deduplication', 
                icon: Copy, 
                color: 'blue',
                criteria: ['Same customer_id', 'Same check_in & check_out', 'Same hotel_name', 'Same amount (±$1)'],
                results: '180 exact duplicates removed',
                complexity: 'O(n) with hash indexing'
              },
              { 
                name: 'Fuzzy Match (Near-Duplicates)', 
                icon: Zap, 
                color: 'amber',
                criteria: ['Same customer_id', 'Dates within ±1 day', 'Hotel name similarity > 0.9 (Levenshtein)', 'Amount within 5%'],
                results: '150 near-duplicates removed',
                complexity: 'O(n log n) with blocking on customer_id'
              },
              { 
                name: 'Cross-Channel Deduplication', 
                icon: Users, 
                color: 'purple',
                criteria: ['Same customer across channels', 'Same dates & hotel', 'Different booking_channel'],
                results: '50 cross-channel duplicates resolved',
                complexity: 'Group by customer_id + dates'
              },
              { 
                name: 'Test Data Cleanup', 
                icon: Trash2, 
                color: 'red',
                criteria: ['Booking IDs starting with TEST_', 'Known test customer_ids', 'Amounts = $0 or $999999'],
                results: '20 test records removed',
                complexity: 'Pattern matching'
              },
            ].map((method, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${method.color}-100 text-${method.color}-600`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-neutral-900">{method.name}</h4>
                      <span className="badge badge-primary">{method.complexity}</span>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1 mb-2">{method.results}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium text-neutral-500">Matching Criteria:</p>
                      <ul className="space-y-1 ml-4">
                        {method.criteria.map((c, j) => (
                          <li key={j} className="text-xs text-neutral-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-amber-200 bg-amber-50">
        <div className="card-body">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Fuzzy Matching Trade-off</h3>
              <p className="text-amber-700 mt-1 text-sm">
                Fuzzy matching catches 150 near-duplicates but requires manual review of borderline cases (similarity 0.85-0.9). 
                Recommendation: Flag similarity 0.85-0.9 for human review, auto-merge {'>'} 0.9. 
                <strong>Estimated 15 false positives</strong> at current threshold.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Deduplication Issues Resolved</h2>
        </div>
        <div className="card-body">
          {dedupIssues.map((issue, i) => (
            <IssueCard key={i} issue={issue} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}