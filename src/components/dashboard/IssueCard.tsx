import { cn } from '../../utils/cn';
import { getSeverityColor, getSeverityBadge } from '../../utils/formatters';
import type { IssueBreakdown } from '../../types';

interface IssueCardProps {
  issue: IssueBreakdown;
  index: number;
}

export function IssueCard({ issue, index }: IssueCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-neutral-900">{index + 1}.</span>
          <div>
            <h4 className="font-medium text-neutral-900">{issue.category}</h4>
            <p className="text-sm text-neutral-600 mt-1">{issue.count.toLocaleString()} records affected ({issue.percentage.toFixed(1)}%)</p>
          </div>
        </div>
        <span className={cn('badge', getSeverityBadge(issue.severity))}>
          {issue.severity}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-medium px-2 py-1 rounded', getSeverityColor(issue.severity))}>
            Severity: {issue.severity}
          </span>
        </div>
        
        {issue.examples.length > 0 && (
          <div className="pt-2 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 mb-1">Examples:</p>
            <ul className="space-y-1">
              {issue.examples.slice(0, 3).map((ex, i) => (
                <li key={i} className="text-xs text-neutral-600 font-mono bg-neutral-50 px-2 py-1 rounded">
                  {ex.length > 60 ? ex.substring(0, 60) + '...' : ex}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}