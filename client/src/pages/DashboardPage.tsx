import React, { useEffect, useState } from 'react';
import StatsCards from '../features/dashboard/StatsCards';
import ChartSection from '../features/dashboard/ChartSection';
import Spinner from '../components/ui/Spinner';
import { getDashboardSummary } from '../services/dashboardApi';
import type { DashboardSummary } from '../types';

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getDashboardSummary()
      .then(setSummary)
      .catch(() => setError('Failed to load dashboard data.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--color-ink)',
        }}
      >
        Dashboard
      </h1>

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px', color: 'var(--color-primary)' }}>
          <Spinner size={32} />
        </div>
      )}

      {error && !isLoading && (
        <div
          style={{
            padding: '16px',
            background: 'var(--color-danger-bg)',
            color: 'var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(220,38,38,0.15)',
          }}
        >
          {error}
        </div>
      )}

      {summary && !isLoading && (
        <>
          <StatsCards summary={summary} />
          <ChartSection summary={summary} />
        </>
      )}
    </div>
  );
}
