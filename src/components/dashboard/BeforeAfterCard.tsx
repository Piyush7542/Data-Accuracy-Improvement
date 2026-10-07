import { cn } from '../../utils/cn';
import type { BeforeAfterRecord } from '../../types';

interface BeforeAfterCardProps {
  record: BeforeAfterRecord;
}

export function BeforeAfterCard({ record }: BeforeAfterCardProps) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-neutral-900">{record.field}</span>
        <span className={cn('badge', record.issue_type === 'fixed' ? 'badge-success' : 'badge-warning')}>
          {record.issue_type}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600 font-medium mb-1">Before</p>
          <p className="text-sm text-red-800 font-mono break-all">{record.before || '(empty)'}</p>
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-600 font-medium mb-1">After</p>
          <p className="text-sm text-green-800 font-mono break-all">{record.after || '(empty)'}</p>
        </div>
      </div>
      
      <p className="mt-3 text-xs text-neutral-500">
        Issue type: <span className="font-medium text-neutral-700">{record.issue_type}</span>
      </p>
    </div>
  );
}