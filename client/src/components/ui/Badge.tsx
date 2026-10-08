import React from 'react';
import type { TaskStatus, TaskPriority } from '../../types';
import { formatStatus } from '../../utils/format';

interface StatusBadgeProps {
  type: 'status';
  value: TaskStatus;
}

interface PriorityBadgeProps {
  type: 'priority';
  value: TaskPriority;
}

type BadgeProps = StatusBadgeProps | PriorityBadgeProps;

const statusStyles: Record<TaskStatus, React.CSSProperties> = {
  pending: {
    background: 'var(--color-warning-bg)',
    color: 'var(--color-warning)',
    border: '1px solid #f6d55c44',
  },
  in_progress: {
    background: 'var(--color-info-bg)',
    color: 'var(--color-info)',
    border: '1px solid #315efb22',
  },
  completed: {
    background: 'var(--color-success-bg)',
    color: 'var(--color-success)',
    border: '1px solid #16845b22',
  },
};

const priorityStyles: Record<TaskPriority, React.CSSProperties> = {
  high: {
    background: 'var(--color-danger-bg)',
    color: 'var(--color-danger)',
    border: '1px solid #c63d4f22',
  },
  medium: {
    background: 'var(--color-warning-bg)',
    color: 'var(--color-warning)',
    border: '1px solid #b7791f22',
  },
  low: {
    background: 'var(--color-surface-subtle)',
    color: 'var(--color-slate)',
    border: '1px solid var(--color-border)',
  },
};

export default function Badge(props: BadgeProps) {
  const style =
    props.type === 'status'
      ? statusStyles[props.value as TaskStatus]
      : priorityStyles[props.value as TaskPriority];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {formatStatus(props.value)}
    </span>
  );
}
