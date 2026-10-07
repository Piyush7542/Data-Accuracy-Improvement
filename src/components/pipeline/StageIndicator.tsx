import { cn } from '../../utils/cn';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import type { PipelineStage } from '../../types';

interface StageIndicatorProps {
  stage: PipelineStage;
  index: number;
  isLast: boolean;
}

const STATUS_ICONS = {
  pending: Clock,
  running: Clock,
  completed: CheckCircle,
  failed: XCircle,
};

const STATUS_COLORS = {
  pending: 'text-neutral-400',
  running: 'text-primary-500 animate-pulse',
  completed: 'text-green-500',
  failed: 'text-red-500',
};

const STATUS_BG = {
  pending: 'bg-neutral-100',
  running: 'bg-primary-100',
  completed: 'bg-green-100',
  failed: 'bg-red-100',
};

import { STAGE_LABELS } from '../../utils/constants';

export function StageIndicator({ stage, index, isLast }: StageIndicatorProps) {
  const Icon = STATUS_ICONS[stage.status];

  return (
    <div className="flex flex-col items-center relative">
      {/* Step Circle */}
      <div className={cn('relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4', STATUS_BG[stage.status])}>
        <Icon className={cn('w-6 h-6', STATUS_COLORS[stage.status])} />
      </div>

      {/* Step Label */}
      <div className="mt-3 text-center w-36">
        <h4 className="font-medium text-sm text-neutral-900">{STAGE_LABELS[stage.id] || stage.name}</h4>
      </div>

      {/* Status */}
      <div className="mt-1">
        <span className={cn(
          'badge text-xs',
          stage.status === 'completed' ? 'badge-success' :
          stage.status === 'running' ? 'badge-primary animate-pulse' :
          stage.status === 'pending' ? 'badge-warning' : 'badge-danger'
        )}>
          {stage.status}
        </span>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-1/2 top-28 w-0.5 h-20 bg-neutral-200 -translate-x-1/2" />
      )}
    </div>
  );
}