import { AlertTriangle, TrendingUp, Target, CheckCircle, BarChart2, Filter, X, Zap, Database, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { IssueCard } from '@/components/dashboard/IssueCard';
import { BarChart } from '@/components/charts/BarChart';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage, getSeverityBadge } from '@/utils/formatters';
import { ISSUE_CATEGORIES } from '@/utils/constants';

export function IssueBreakdown() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { issues, loading, error } = useQualityData();
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

  const criticalCount = issues.filter(i => i.severity === 'critical').reduce((sum, i) => sum + i.count, 0);
  const highCount = issues.filter(i => i.severity === 'high').reduce((sum, i) => sum + i.count, 0);
  const mediumCount = issues.filter(i => i.severity === 'medium').reduce((sum, i) => sum + i.count, 0);
  const lowCount = issues.filter(i => i.severity === 'low').reduce((sum, i) => sum + i.count, 0);

  // Sort issues by count
  const sortedIssues = [...issues].sort((a, b) => b.count - a.count);

  const totalIssues = issues.reduce((sum, i) => sum + i.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold text-neutral-900">Issue Breakdown</h1>
            <span className="badge badge-danger">Analysis</span>
          </div>
          <p className="text-neutral-600 mt-1">Detailed breakdown of all data quality issues by category and severity</p>
        </div>
        <FilterBar
          filters={filters}
          onChange={useFilters().setFilters}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard label="Total Issues" value={totalIssues} format="number" icon={<AlertTriangle className="w-8 h-8" />} />
        <KPICard label="Critical" value={criticalCount} format="number" trend="down" icon={<AlertTriangle className="w-8 h-8" />} />
        <KPICard label="High" value={highCount} format="number" icon={<TrendingUp className="w-8 h-8" />} />
        <KPICard label="Categories" value={issues.length} format="number" icon={<Database className="w-8 h-8" />} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search issue category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Issue Categories by Count</h2>
        </div>
        <div className="card-body">
          <BarChart
            data={sortedIssues}
            xKey="category"
            yKeys={['count']}
            labels={['Issues']}
            colors={sortedIssues.map(i => {
              if (i.severity === 'critical') return '#ef4444';
              if (i.severity === 'high') return '#f97316';
              if (i.severity === 'medium') return '#f59e0b';
              return '#3b82f6';
            })}
            height={350}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Severity Distribution</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Critical', count: criticalCount, color: 'red', icon: AlertTriangle },
              { label: 'High', count: highCount, color: 'orange', icon: Zap },
              { label: 'Medium', count: mediumCount, color: 'amber', icon: Target },
              { label: 'Low', count: lowCount, color: 'blue', icon: Database },
            ].map(item => (
              <div key={item.label} className={`p-4 rounded-lg text-center bg-${item.color}-50 border border-${item.color}-200`}>
                <item.icon className={`w-8 h-8 text-${item.color}-600 mx-auto mb-2`} />
                <p className="text-3xl font-bold text-${item.color}-600">{formatNumber(item.count)}</p>
                <p className="text-sm text-neutral-500 mt-1">{item.label} Severity</p>
                <p className="text-xs text-neutral-400 mt-1">{formatPercentage(item.count / totalIssues * 100)} of total</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">All Issues ({issues.length} categories)</h2>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input w-48"
            />
          </div>
        </div>
        <div className="card-body">
          {sortedIssues
            .filter(issue => 
              issue.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((issue, i) => (
              <IssueCard key={i} issue={issue} index={i} />
            ))}
        </div>
      </div>
    </div>
  );
}