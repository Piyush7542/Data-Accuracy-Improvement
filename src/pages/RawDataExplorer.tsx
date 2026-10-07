import { Database, Search, Filter, X, Download, AlertTriangle, Eye, Hash } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';
import { ISSUE_CATEGORIES } from '@/utils/constants';

export function RawDataExplorer() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { metrics, loading, error } = useQualityData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showIssuesOnly, setShowIssuesOnly] = useState(false);

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

  // Sample raw records (simulated for demo)
  const sampleRecords = [
    { booking_id: 'BK_0001', customer_id: 'CUST_001', customer_name: 'John  Smith', email: 'john..smith@email.com', phone: '+1-555-0123', country: 'USA', city: 'New York', hotel_name: 'Grand Hotel', check_in: '2024-01-15', check_out: '2024-01-18', nights: 3, room_type: 'Delux', booking_date: '2024-01-10', amount: 450.00, currency: 'USD', payment_status: 'Paid', booking_channel: 'Web', issues: ['Incorrect Casing', 'Invalid Category', 'Duplicate Email'] },
    { booking_id: 'BK_0002', customer_id: 'CUST_002', customer_name: 'Jane Doe', email: 'jane.doe@email', phone: '555-0124', country: 'US', city: 'NYC', hotel_name: 'Grand Hotel', check_in: '15/01/2024', check_out: '18/01/2024', nights: 3, room_type: 'Standard', booking_date: '2024-01-11', amount: 300, currency: 'USD', payment_status: 'paid', booking_channel: 'Mobile', issues: ['Invalid Email', 'Incorrect Date Format', 'Inconsistent City', 'Casing'] },
    { booking_id: 'BK_0003', customer_id: '', customer_name: 'Bob Johnson', email: 'bob@email.com', phone: '555-0125', country: 'UK', city: 'London', hotel_name: 'Royal Hotel', check_in: '2024-01-20', check_out: '2024-01-25', nights: 5, room_type: 'Suit', booking_date: '2024-01-12', amount: -50, currency: 'EUR', payment_status: 'Pending', booking_channel: 'Agent', issues: ['Missing ID', 'Negative Amount', 'Currency Mismatch', 'Invalid Category'] },
    { booking_id: 'BK_0004', customer_id: 'CUST_004', customer_name: 'ALICE WILLIAMS', email: 'alice@email.com', phone: '555-0126', country: 'Australia', city: 'Sydney', hotel_name: 'Harbor View', check_in: '2024-02-01', check_out: '2024-02-10', nights: 9, room_type: 'Executive', booking_date: '2024-01-15', amount: 1200.00, currency: 'AUD', payment_status: 'Paid', booking_channel: 'Web', issues: ['Incorrect Casing'] },
    { booking_id: 'BK_0005', customer_id: 'CUST_005', customer_name: 'Charlie Brown', email: 'charlie@email.com', phone: '555-0127', country: 'Canada', city: 'Toronto', hotel_name: 'Maple Inn', check_in: '2024-02-15', check_out: '2024-02-20', nights: 5, room_type: 'Standard', booking_date: '2024-02-10', amount: 0, currency: 'CAD', payment_status: 'Failed', booking_channel: 'Phone', issues: ['Zero Amount', 'Payment Failed'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Raw Data Explorer</h1>
          <p className="text-neutral-600 mt-1">
            Explore raw synthetic travel booking data with injected quality issues
          </p>
        </div>
        <FilterBar
          filters={filters}
          onChange={useFilters().setFilters}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Records" value={10000} format="number" icon={<Database className="w-8 h-8" />} />
        <KPICard label="Initial Accuracy" value={80} format="percentage" icon={<AlertTriangle className="w-8 h-8" />} />
        <KPICard label="Issue Categories" value={ISSUE_CATEGORIES.length} format="number" icon={<Hash className="w-8 h-8" />} />
        <KPICard label="Records with Issues" value={8500} format="number" trend="down" change={-15} icon={<AlertTriangle className="w-8 h-8" />} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search booking ID, customer, hotel..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer">
            <input
              type="checkbox"
              checked={showIssuesOnly}
              onChange={e => setShowIssuesOnly(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
            />
            Show only records with issues
          </label>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Sample Records (5 of 10,000)</h2>
          <span className="text-sm text-neutral-500">85% have quality issues</span>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Hotel</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Issues</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sampleRecords.map((record, i) => (
                  <tr key={i} className={showIssuesOnly && record.issues.length === 0 ? 'hidden' : ''}>
                    <td className="font-mono text-sm">{record.booking_id}</td>
                    <td className="max-w-[150px] truncate">{record.customer_name}</td>
                    <td className="max-w-[150px] truncate">{record.hotel_name}</td>
                    <td className="text-sm text-neutral-600">{record.check_in} → {record.check_out}</td>
                    <td className="font-mono text-sm">{record.currency} {record.amount.toFixed(2)}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {record.issues.map((issue, j) => (
                          <span key={j} className="px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded">{issue}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button className="btn-ghost p-1" title="View details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Issue Distribution in Sample</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Incorrect Casing', count: 3, color: 'amber' },
              { label: 'Invalid Category', count: 2, color: 'red' },
              { label: 'Currency Mismatch', count: 1, color: 'blue' },
              { label: 'Missing ID', count: 1, color: 'red' },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-neutral-50 rounded-lg border-l-4" style={{ borderLeftColor: item.color === 'amber' ? '#f59e0b' : item.color === 'red' ? '#ef4444' : '#3b82f6' }}>
                <p className="font-medium text-neutral-900">{item.label}</p>
                <p className="text-3xl font-bold text-neutral-900 mt-1">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}