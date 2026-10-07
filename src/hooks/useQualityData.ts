import { useState, useEffect, useCallback } from 'react';
import type { QualityMetrics, IssueBreakdown, PipelineStage, BeforeAfterRecord } from '../types';

interface QualityData {
  metrics: QualityMetrics[];
  issues: IssueBreakdown[];
  pipelineStages: PipelineStage[];
  beforeAfter: BeforeAfterRecord[];
  loading: boolean;
  error: string | null;
}

export function useQualityData(): QualityData {
  const [metrics, setMetrics] = useState<QualityMetrics[]>([]);
  const [issues, setIssues] = useState<IssueBreakdown[]>([]);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>([]);
  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [metricsRes, issuesRes, stagesRes, baRes] = await Promise.all([
        fetch('/data/quality-metrics.json'),
        fetch('/data/issue-breakdown.json'),
        fetch('/data/pipeline-stages.json'),
        fetch('/data/sample-records.json'),
      ]);
      
      if (!metricsRes.ok || !issuesRes.ok || !stagesRes.ok || !baRes.ok) {
        throw new Error('Failed to load data');
      }
      
      const metricsData = await metricsRes.json();
      const issuesData = await issuesRes.json();
      const stagesData = await stagesRes.json();
      const baData = await baRes.json();
      
      setMetrics(metricsData);
      setIssues(issuesData);
      setPipelineStages(stagesData);
      setBeforeAfter(baData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    metrics,
    issues,
    pipelineStages,
    beforeAfter,
    loading,
    error,
  };
}