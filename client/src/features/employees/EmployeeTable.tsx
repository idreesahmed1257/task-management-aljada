import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import Button from '../../components/ui/Button';
import type { Employee } from '../../types';
import { formatDate } from '../../utils/format';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
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

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) {
    return <EmptyState title="No employees" description="Add your first employee to get started." />;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ background: 'var(--color-surface-subtle)' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>Joined</th>
            <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp._id}
              style={{ transition: 'background 0.12s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-surface-subtle)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={tdStyle}>
                <span style={{ fontWeight: 500 }}>{emp.name}</span>
              </td>
              <td style={{ ...tdStyle, color: 'var(--color-slate)' }}>{emp.email}</td>
              <td style={tdStyle}>{emp.position}</td>
              <td style={{ ...tdStyle, color: 'var(--color-muted-slate)', fontSize: '13px' }}>
                {formatDate(emp.createdAt)}
              </td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<Pencil size={13} />}
                    onClick={() => onEdit(emp)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<Trash2 size={13} />}
                    onClick={() => onDelete(emp)}
                    style={{ color: 'var(--color-danger)' }}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
