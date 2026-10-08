import React from 'react';
import type { DashboardSummary } from '../../types';

interface StatCardProps {
  label: string;
  value: number;
  borderColor: string;
}

function StatCard({ label, value, borderColor }: StatCardProps) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 'var(--radius-md)',
        padding: '18px 20px 16px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '34px',
          fontWeight: 500,
          color: 'var(--color-ink)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '13px',
          color: 'var(--color-slate)',
          marginTop: '8px',
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface StatsCardsProps {
  summary: DashboardSummary;
}

export default function StatsCards({ summary }: StatsCardsProps) {
  const cards = [
    {
      label: 'Employees',
      value: summary.totalEmployees,
      borderColor: 'var(--color-primary)',
    },
    {
      label: 'Tasks',
      value: summary.totalTasks,
      borderColor: 'var(--color-slate)',
    },
    {
      label: 'Pending',
      value: summary.pendingTasks,
      borderColor: 'var(--color-warning)',
    },
    {
      label: 'In progress',
      value: summary.inProgressTasks,
      borderColor: 'var(--color-info)',
    },
    {
      label: 'Complete',
      value: summary.completedTasks,
      borderColor: 'var(--color-success)',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
        gap: 'var(--gap)',
      }}
    >
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
