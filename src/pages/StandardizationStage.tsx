import { AlignLeft, Globe, Hash, Calendar, Edit3, Zap, CheckCircle, Database, Target } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { IssueCard } from '@/components/dashboard/IssueCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';

export function StandardizationStage() {
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

  const stdMetrics = metrics.find(m => m.stage === 'standardization') || metrics[3];
  const recordsIn = stdMetrics?.records_in || 9200;
  const recordsOut = stdMetrics?.records_out || 9200;
  const issuesFixed = stdMetrics?.issues_fixed || 400;

  const stdIssues = [
    { category: 'Date Format Standardization', count: 1200, percentage: 12.0, severity: 'high' as const, examples: ['"15/01/2024" → "2024-01-15"', '"2024/01/15" → "2024-01-15"', '"Jan 15, 2024" → "2024-01-15"'] },
    { category: 'City Name Normalization', count: 800, percentage: 8.0, severity: 'high' as const, examples: ['NYC → New York', 'New York City → New York', 'nyc → New York', 'SF → San Francisco'] },
    { category: 'Name Casing', count: 1500, percentage: 15.0, severity: 'medium' as const, examples: ['john smith → John Smith', 'JANE DOE → Jane Doe', 'ALICE WILLIAMS → Alice Williams'] },
    { category: 'Category Standardization', count: 300, percentage: 3.0, severity: 'high' as const, examples: ['Delux → Deluxe', 'Standar → Standard', 'Suit → Suite', 'Exec → Executive'] },
    { category: 'Country Code Standardization', count: 200, percentage: 2.0, severity: 'medium' as const, examples: ['US → USA', 'UK → United Kingdom', 'UAE → United Arab Emirates'] },
    { category: 'Room Type Mapping', count: 250, percentage: 2.5, severity: 'high' as const, examples: ['Delux → Deluxe', 'Standar → Standard', 'Suit → Suite'] },
    { category: 'Payment Status Normalization', count: 150, percentage: 1.5, severity: 'medium' as const, examples: ['paid → Paid', 'PENDING → Pending', 'failed → Failed'] },
    { category: 'Channel Name Mapping', count: 100, percentage: 1.0, severity: 'low' as const, examples: ['web → Web', 'mobile → Mobile', 'agent → Agent'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlignLeft className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Standardization Stage</h1>
            <span className="badge badge-purple">Completed</span>
          </div>
          <p className="text-neutral-600 mt-1">Normalize dates, names, categories, and reference data to consistent formats</p>
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
        <KPICard label="Issues Fixed" value={issuesFixed} format="number" change={10} icon={<Zap className="w-8 h-8" />} />
        <KPICard label="Accuracy" value={95} format="percentage" trend="up" change={1} icon={<Target className="w-8 h-8" />} />
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Standardization Rules Applied</h2>
        </div>
        <div className="card-body">
          <div className="space-y-3">
            {[
              { name: 'Date Parsing (12 formats)', icon: Calendar, color: 'blue', description: 'Unified parser with fallback: ISO, DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD, DD-MM-YYYY, Mon DD, YYYY, etc.', stats: '1,200 dates standardized' },
              { name: 'City Name Fuzzy Matching', icon: Globe, color: 'green', description: 'Levenshtein distance matching against reference table of 500+ cities. Threshold: 0.85', stats: '800 city names normalized (47 variants → 10 cities)' },
              { name: 'Name Title Case', icon: Edit3, color: 'amber', description: 'Convert to Title Case. Handle prefixes (Mc, Mac, van, de) and hyphenated names.', stats: '1,500 names corrected' },
              { name: 'Category Enum Mapping', icon: Hash, color: 'purple', description: 'Map variants to canonical values using reference tables. Fuzzy match with 0.9 threshold.', stats: '900 categories standardized (Delux→Deluxe, Suit→Suite, etc.)' },
              { name: 'Country Code ISO 3166', icon: Globe, color: 'blue', description: 'Map 2-letter and 3-letter codes to full names. Handle special cases (UK, UAE).', stats: '200 country codes normalized' },
              { name: 'Payment Status Title Case', icon: Zap, color: 'orange', description: 'Standardize to: Paid, Pending, Failed, Refunded, Cancelled', stats: '150 statuses corrected' },
              { name: 'Channel Name Standardization', icon: Database, color: 'indigo', description: 'Map to: Web, Mobile, Agent, Phone, Email', stats: '100 channels corrected' },
            ].map((rule, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-lg flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${rule.color}-100 text-${rule.color}-600`}>
                  <rule.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900">{rule.name}</h4>
                  <p className="text-sm text-neutral-600 mt-1">{rule.description}</p>
                  <p className="text-xs text-primary-600 mt-2 font-medium">{rule.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Standardization Issues Fixed</h2>
        </div>
        <div className="card-body">
          {stdIssues.map((issue, i) => (
            <IssueCard key={i} issue={issue} index={i} />
          ))}
        </div>
      </div>

      <div className="card border-green-200 bg-green-50">
        <div className="card-body">
          <div className="flex items-start gap-3">
            <Zap className="w-6 h-6 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-800">Key Win: Date Parsing</h3>
              <p className="text-green-700 mt-1 text-sm">
                12 different date formats detected in raw data. Built unified parser with fallback chain achieving 
                <strong>99.9% parse success rate</strong>. This single fix resolved 12% of all accuracy issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}