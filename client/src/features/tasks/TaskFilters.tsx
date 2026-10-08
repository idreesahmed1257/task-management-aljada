import React from 'react';
import type { Employee, TaskFilters as Filters, TaskStatus, TaskPriority } from '../../types';

interface TaskFiltersProps {
  employees: Employee[];
  filters: Filters;
  onChange: (filters: Filters) => void;
  hideStatus?: boolean;
}

const selectStyle: React.CSSProperties = {
  height: '34px',
  padding: '0 8px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '13px',
  color: 'var(--color-ink)',
  background: 'var(--color-surface)',
  cursor: 'pointer',
  minWidth: '140px',
};

export default function TaskFilters({ employees, filters, onChange, hideStatus }: TaskFiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      <select
        style={selectStyle}
        value={filters.employeeId ?? ''}
        onChange={(e) => onChange({ ...filters, employeeId: e.target.value || undefined })}
      >
        <option value="">All Employees</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      {!hideStatus && (
        <select
          style={selectStyle}
          value={filters.status ?? ''}
          onChange={(e) => onChange({ ...filters, status: (e.target.value as TaskStatus) || '' })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      )}

      <select
        style={selectStyle}
        value={filters.priority ?? ''}
        onChange={(e) => onChange({ ...filters, priority: (e.target.value as TaskPriority) || '' })}
      >
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {(filters.employeeId || filters.status || filters.priority) && (
        <button
          onClick={() => onChange({})}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '13px',
            color: 'var(--color-primary)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
