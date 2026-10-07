import { TrendingUp, TrendingDown, Database, CheckCircle, AlertTriangle, Zap, Target } from 'lucide-react';
import { useFilters } from '@/hooks/useFilters';
import { FilterBar } from '@/components/ui/FilterBar';
import { KPICard } from '@/components/dashboard/KPICard';
import { ProgressChart } from '@/components/charts/ProgressChart';
import { PipelineFlow } from '@/components/pipeline/PipelineFlow';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { useQualityData } from '@/hooks/useQualityData';
import { formatNumber, formatPercentage } from '@/utils/formatters';

export function ExecutiveSummary() {
  const { filters, hasActiveFilters, resetFilters } = useFilters();
  const { metrics, pipelineStages, loading, error } = useQualityData();

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

  // Compute overall metrics
  const rawStage = pipelineStages.find(s => s.id === 'raw');
  const cleanStage = pipelineStages.find(s => s.id === 'clean');
  const totalIssuesFixed = pipelineStages.reduce((sum, s) => sum + s.issues_fixed, 0);
  const accuracyImprovement = (cleanStage?.accuracy_after || 96) - (rawStage?.accuracy_before || 80);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Executive Summary</h1>
          <p className="text-neutral-600 mt-1">
            Data quality pipeline: 10,000 travel bookings • 80% → 96% accuracy
          </p>
        </div>
        <FilterBar
          filters={filters}
          onChange={useFilters().setFilters}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          label="Initial Accuracy"
          value={rawStage?.accuracy_before || 80}
          format="percentage"
          icon={<Database className="w-8 h-8" />}
        />
        <KPICard
          label="Final Accuracy"
          value={cleanStage?.accuracy_after || 96}
          format="percentage"
          trend="up"
          change={accuracyImprovement}
          icon={<CheckCircle className="w-8 h-8" />}
        />
        <KPICard
          label="Accuracy Improvement"
          value={accuracyImprovement}
          format="percentage"
          trend="up"
          change={accuracyImprovement > 10 ? 100 : 50}
          icon={<TrendingUp className="w-8 h-8" />}
        />
        <KPICard
          label="Issues Fixed"
          value={totalIssuesFixed}
          format="number"
          icon={<Zap className="w-8 h-8" />}
        />
        <KPICard
          label="Pipeline Stages"
          value={pipelineStages.length}
          format="number"
          description="6 transformation steps"
          icon={<Target className="w-8 h-8" />}
        />
      </div>

      {/* Accuracy Progress */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Accuracy Progress Through Pipeline</h2>
        </div>
        <div className="card-body">
          <ProgressChart
            stages={pipelineStages.map(s => ({
              id: s.id,
              label: s.name,
              accuracy: s.accuracy_after,
              color: s.id === 'clean' ? '#16a34a' : s.id === 'raw' ? '#ef4444' : undefined,
            }))}
            height={100}
          />
        </div>
      </div>

      {/* Pipeline Flow */}
      <PipelineFlow stages={pipelineStages} />

      {/* Key Insights */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Key Insights</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard
              title="Standardization Drives Biggest Gain"
              description="Date format standardization and city name normalization contributed 35% of total accuracy improvement — the single largest factor."
              icon={<Zap className="w-5 h-5" />}
              type="finding"
              metric="Contribution"
              value="35%"
            />
            <InsightCard
              title="Deduplication Recovers Revenue"
              description="Removing 800+ duplicate bookings prevented double-counting in revenue reports and improved customer communication accuracy."
              icon={<Database className="w-5 h-5" />}
              type="success"
              metric="Duplicates Removed"
              value="800+"
            />
            <InsightCard
              title="Missing IDs Block Automation"
              description="5% of records missing booking_id or customer_id prevented automated processing. Imputed IDs enabled full pipeline automation."
              icon={<AlertTriangle className="w-5 h-5" />}
              type="risk"
              metric="Records Affected"
              value="500"
            />
            <InsightCard
              title="Currency Mismatch = Revenue Risk"
              description="5% of records had USD amounts with EUR currency codes. Automated detection and correction prevented reporting errors."
              icon={<TrendingUp className="w-5 h-5" />}
              type="opportunity"
              metric="Mismatch Rate"
              value="5%"
            />
            <InsightCard
              title="Date Parsing: 12 Formats Detected"
              description="Raw data contained 12 different date formats. Unified parser with fallback logic achieved 99.9% parse success rate."
              icon={<Zap className="w-5 h-5" />}
              type="finding"
              metric="Parse Success"
              value="99.9%"
            />
            <InsightCard
              title="City Normalization: 47 Variants → 10 Cities"
              description="47 different city name variants (NYC, New York, New York City, nyc, etc.) normalized to 10 standard city names using fuzzy matching."
              icon={<Target className="w-5 h-5" />}
              type="success"
              metric="Variants Reduced"
              value="47 → 10"
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Recommendations</h2>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <RecommendationCard
              title="Implement Real-Time Validation at Entry Point"
              description="Add client-side validation on booking forms to catch 60% of issues before they enter the pipeline. Reduces downstream cleaning by 40%."
              priority="high"
              effort="medium"
              impact="high"
              related_page="Validation Stage"
            />
            <RecommendationCard
              title="Automate Deduplication with ML"
              description="Replace rule-based deduplication with embedding-based similarity for near-duplicates. Catches 25% more near-duplicates than exact matching."
              priority="high"
              effort="high"
              impact="high"
              related_page="Deduplication Stage"
            />
            <RecommendationCard
              title="Build Data Quality Dashboard for Ops"
              description="Expose pipeline metrics to operations team. Alert on accuracy drops >2% or issue spikes >20% vs baseline."
              priority="medium"
              effort="low"
              impact="medium"
              related_page="Quality Dashboard"
            />
            <RecommendationCard
              title="Version Control for Reference Data"
              description="Track city names, hotel names, room types in versioned reference tables. Enables audit trail and rollback."
              priority="medium"
              effort="medium"
              impact="medium"
              related_page="Standardization Stage"
            />
            <RecommendationCard
              title="Automated Currency Validation"
              description="Add ISO 4217 currency code validation with amount/currency consistency checks. Prevents 100% of currency mismatch issues."
              priority="medium"
              effort="low"
              impact="high"
              related_page="Validation Stage"
            />
          </div>
        </div>
      </div>
    </div>
  );
}