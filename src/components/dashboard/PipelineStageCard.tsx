import { cn } from '../../utils/cn';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import type { PipelineStage } from '../../types';
import { formatNumber, formatPercentage } from '../../utils/formatters';
import { STAGE_LABELS } from '../../utils/constants';

interface PipelineStageCardProps {
  stage: PipelineStage;
  index: number;
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

export function PipelineStageCard({ stage, index }: PipelineStageCardProps) {
  const Icon = STATUS_ICONS[stage.status];

  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h4 className="font-medium text-neutral-900">{STAGE_LABELS[stage.id] || stage.name}</h4>
            <span className={cn(
              'badge',
              stage.status === 'completed' ? 'badge-success' :
              stage.status === 'running' ? 'badge-primary animate-pulse' :
              stage.status === 'pending' ? 'badge-warning' : 'badge-danger'
            )}>
              {stage.status}
            </span>
          </div>
          <p className="text-sm text-neutral-600 mt-1">{stage.description}</p>
        </div>
        <div className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold">
          <Icon className={cn('w-8 h-8', STATUS_COLORS[stage.status])} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-neutral-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">{formatNumber(stage.input_records)}</p>
          <p className="text-xs text-neutral-500">Input Records</p>
        </div>
        <div className="p-3 bg-neutral-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{formatNumber(stage.output_records)}</p>
          <p className="text-xs text-neutral-500">Output Records</p>
        </div>
        <div className="p-3 bg-neutral-50 rounded-lg">
          <p className="text-2xl font-bold text-amber-600">{formatNumber(stage.issues_fixed)}</p>
          <p className="text-xs text-neutral-500">Issues Fixed</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-neutral-50 rounded-lg">
            <p className="text-lg font-bold text-red-600">{formatPercentage(stage.accuracy_before)}</p>
            <p className="text-xs text-neutral-500">Accuracy Before</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg">
            <p className="text-lg font-bold text-green-600">{formatPercentage(stage.accuracy_after)}</p>
            <p className="text-xs text-neutral-500">Accuracy After</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
          <span>Duration: {(stage.duration_ms / 1000).toFixed(1)}s</span>
          <span>Improvement: +{(stage.accuracy_after - stage.accuracy_before).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}