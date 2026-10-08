import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = 'No results',
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: '12px',
        color: 'var(--color-muted-slate)',
        textAlign: 'center',
      }}
    >
      <Inbox size={36} strokeWidth={1.5} />
      <div>
        <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--color-slate)' }}>
          {title}
        </p>
        {description && (
          <p style={{ fontSize: '13px', marginTop: '4px' }}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
