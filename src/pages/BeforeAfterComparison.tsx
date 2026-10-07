import { GitCompare, Search, Filter, X, Database, Eye, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Hash, Target } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { BeforeAfterCard } from '@/components/dashboard/BeforeAfterCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber } from '@/utils/formatters';

export function BeforeAfterComparison() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { beforeAfter, loading, error } = useQualityData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);

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

  // Sample before/after records
  const records: Array<{
    field: string;
    before: string;
    after: string;
    issue_type: string;
    category: string;
  }> = [
    { field: 'check_in', before: '15/01/2024', after: '2024-01-15', issue_type: 'fixed', category: 'Date Format' },
    { field: 'check_out', before: '18/01/2024', after: '2024-01-18', issue_type: 'fixed', category: 'Date Format' },
    { field: 'city', before: 'NYC', after: 'New York', issue_type: 'fixed', category: 'City Normalization' },
    { field: 'city', before: 'New York City', after: 'New York', issue_type: 'fixed', category: 'City Normalization' },
    { field: 'customer_name', before: 'john  smith', after: 'John Smith', issue_type: 'fixed', category: 'Name Casing' },
    { field: 'room_type', before: 'Delux', after: 'Deluxe', issue_type: 'fixed', category: 'Category Mapping' },
    { field: 'room_type', before: 'Standar', after: 'Standard', issue_type: 'fixed', category: 'Category Mapping' },
    { field: 'room_type', before: 'Suit', after: 'Suite', issue_type: 'fixed', category: 'Category Mapping' },
    { field: 'country', before: 'US', after: 'USA', issue_type: 'fixed', category: 'Country Code' },
    { field: 'payment_status', before: 'paid', after: 'Paid', issue_type: 'fixed', category: 'Status Normalization' },
    { field: 'email', before: 'john..smith@email.com', after: 'john.smith@email.com', issue_type: 'fixed', category: 'Email Cleaning' },
    { field: 'amount', before: '-50', after: '300', issue_type: 'fixed', category: 'Negative Value' },
    { field: 'nights', before: '365', after: '30', issue_type: 'fixed', category: 'Outlier Capping' },
    { field: 'customer_id', before: '', after: 'CUST_0001', issue_type: 'fixed', category: 'Missing ID' },
    { field: 'currency', before: 'EUR', after: 'USD', issue_type: 'fixed', category: 'Currency Mismatch' },
  ];

  const filtered = records.filter(r => 
    r.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(records.map(r => r.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <GitCompare className="w-6 h-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Before/After Comparison</h1>
            <span className="badge badge-primary">All Stages</span>
          </div>
          <p className="text-neutral-600 mt-1">Side-by-side comparison of data transformations across all pipeline stages</p>
        </div>
        <FilterBar
          filters={filters}
          onChange={useFilters().setFilters}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Transformations" value={records.length} format="number" icon={<GitCompare className="w-8 h-8" />} />
        <KPICard label="Categories" value={categories.length} format="number" icon={<Hash className="w-8 h-8" />} />
        <KPICard label="Fixed" value={records.filter(r => r.issue_type === 'fixed').length} format="number" icon={<CheckCircle className="w-8 h-8" />} />
        <KPICard label="Success Rate" value={100} format="percentage" icon={<Target className="w-8 h-8" />} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search field, category, or value..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filters.issueCategories.join(',') || 'all'}
            onChange={e => {
              const val = e.target.value;
              if (val === 'all') {
                useFilters().setFilters({ ...filters, issueCategories: [] });
              } else {
                useFilters().setFilters({ ...filters, issueCategories: [val] });
              }
            }}
            className="select w-48"
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Transformations ({filtered.length} of {records.length})</h2>
        </div>
        <div className="card-body">
          {selectedField && (
            <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-primary-800">Detail: {selectedField}</h3>
                <button onClick={() => setSelectedField(null)} className="text-primary-600 hover:text-primary-800">Close ×</button>
              </div>
              {(() => {
                const rec = records.find(r => r.field === selectedField);
                if (!rec) return null;
                return (
                  <BeforeAfterCard record={{ ...rec, issue_type: rec.issue_type }} />
                );
              })()}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((record, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer border-2 border-transparent hover:border-primary-300"
                onClick={() => setSelectedField(record.field)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-500">{record.category}</span>
                  <span className="badge badge-success">{record.issue_type}</span>
                </div>
                <div className="font-medium text-neutral-900 mb-2">{record.field}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-red-50 border border-red-200 rounded">
                    <div className="text-xs text-red-600">Before</div>
                    <div className="font-mono text-red-800 break-all">{record.before || '(empty)'}</div>
                  </div>
                  <div className="p-2 bg-green-50 border border-green-200 rounded">
                    <div className="text-xs text-green-600">After</div>
                    <div className="font-mono text-green-800 break-all">{record.after || '(empty)'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-neutral-300 mx-auto" />
              <p className="text-neutral-500 mt-4">No transformations match your filters</p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Category Summary</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => {
              const count = records.filter(r => r.category === cat).length;
              return (
                <div key={cat} className="p-4 bg-neutral-50 rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary-600">{count}</p>
                  <p className="text-sm text-neutral-500 mt-1">{cat}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}