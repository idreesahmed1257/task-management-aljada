import React from 'react';
import { Pencil, Trash2, RefreshCw } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import type { Task, TaskStatus, Employee } from '../../types';
import { formatDate } from '../../utils/format';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
}

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: '12.5px',
  fontWeight: 600,
  color: 'var(--color-slate)',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '11px 14px',
  fontSize: '14px',
  color: 'var(--color-ink)',
  borderTop: '1px solid var(--color-border)',
  verticalAlign: 'middle',
};

function getEmployeeName(employeeId: string | Employee): string {
  if (typeof employeeId === 'object' && employeeId !== null) return employeeId.name;
  return '—';
}

const STATUS_CYCLE: Record<TaskStatus, TaskStatus> = {
  pending: 'in_progress',
  in_progress: 'completed',
  completed: 'pending',
};

export default function TaskTable({ tasks, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  if (tasks.length === 0) {
    return <EmptyState title="No tasks" description="Create your first task to get started." />;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'var(--color-surface-subtle)' }}>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Employee</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Due Date</th>
            <th style={thStyle}>Status</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              style={{ transition: 'background 0.12s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-subtle)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={tdStyle}>
                <span style={{ fontWeight: 500 }}>{task.title}</span>
                {task.description && (
                  <div style={{ fontSize: '12px', color: 'var(--color-muted-slate)', marginTop: '2px', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {task.description}
                  </div>
                )}
              </td>
              <td style={{ ...tdStyle, color: 'var(--color-slate)' }}>{getEmployeeName(task.employeeId)}</td>
              <td style={tdStyle}><Badge type="priority" value={task.priority} /></td>
              <td style={{ ...tdStyle, fontSize: '13px', color: 'var(--color-muted-slate)' }}>{formatDate(task.dueDate)}</td>
              <td style={tdStyle}><Badge type="status" value={task.status} /></td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<RefreshCw size={12} />}
                    onClick={() => onStatusChange(task, STATUS_CYCLE[task.status])}
                    title={`Mark as ${STATUS_CYCLE[task.status]}`}
                  />
                  <Button size="sm" variant="ghost" icon={<Pencil size={13} />} onClick={() => onEdit(task)}>Edit</Button>
                  <Button size="sm" variant="ghost" icon={<Trash2 size={13} />} onClick={() => onDelete(task)} style={{ color: 'var(--color-danger)' }}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
