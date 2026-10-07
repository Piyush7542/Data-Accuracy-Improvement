// Formatting utilities

export function formatNumber(value: number, decimals = 0): string {
  if (value >= 1e9) return (value / 1e9).toFixed(decimals) + 'B';
  if (value >= 1e6) return (value / 1e6).toFixed(decimals) + 'M';
  if (value >= 1e3) return (value / 1e3).toFixed(decimals) + 'K';
  return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDays(value: number): string {
  return `${value} days`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getTrendClass(change: number | undefined): 'up' | 'down' | 'neutral' {
  if (change === undefined) return 'neutral';
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'neutral';
}

export function getTrendIcon(change: number | undefined): string {
  if (change === undefined) return 'minus';
  if (change > 0) return 'trending-up';
  if (change < 0) return 'trending-down';
  return 'minus';
}

export function getTrendLabel(change: number | undefined): string {
  if (change === undefined) return '—';
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: 'text-red-600 bg-red-50',
    high: 'text-orange-600 bg-orange-50',
    medium: 'text-amber-600 bg-amber-50',
    low: 'text-blue-600 bg-blue-50',
  };
  return colors[severity] || 'text-neutral-600 bg-neutral-50';
}

export function getSeverityBadge(severity: string): string {
  const badges: Record<string, string> = {
    critical: 'badge-danger',
    high: 'badge-warning',
    medium: 'badge-amber',
    low: 'badge-primary',
  };
  return badges[severity] || 'badge-neutral';
}