import { cn } from '../../utils/cn';

interface ProgressChartProps {
  stages: Array<{
    id: string;
    label: string;
    accuracy: number;
    color?: string;
  }>;
  height?: number;
  className?: string;
  showLabels?: boolean;
}

const STAGE_COLORS = {
  raw: '#ef4444',
  validation: '#f97316',
  cleaning: '#f59e0b',
  standardization: '#8b5cf6',
  deduplication: '#f97316',
  quality_check: '#22c55e',
  clean: '#16a34a',
};

export function ProgressChart({
  stages,
  height = 120,
  className = '',
  showLabels = true,
}: ProgressChartProps) {
  if (!stages.length) {
    return (
      <div className={cn('flex items-center justify-center h-64 bg-neutral-50 rounded-lg border border-neutral-200', className)}>
        <p className="text-neutral-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <div className="flex items-end justify-between h-full gap-4 px-2">
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className="flex flex-col items-center flex-1"
            style={{ height: '100%' }}
          >
            {/* Progress Bar */}
            <div className="flex-1 flex items-end w-full">
              <div
                className="w-full rounded-t transition-all duration-500"
                style={{
                  height: `${stage.accuracy}%`,
                  backgroundColor: stage.color || STAGE_COLORS[stage.id as keyof typeof STAGE_COLORS] || '#22c55e',
                }}
              />
            </div>
            
            {/* Accuracy Label */}
            {showLabels && (
              <div className="mt-2 text-center">
                <div className="text-lg font-bold text-neutral-900">{stage.accuracy}%</div>
                <div className="text-xs text-neutral-500 capitalize">{stage.label}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}