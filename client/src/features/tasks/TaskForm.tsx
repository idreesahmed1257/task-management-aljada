import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import type { Employee } from '../../types';
import { formatDateInput } from '../../utils/format';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  employeeId: z.string().min(1, 'Employee is required'),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['pending', 'in_progress', 'completed']),
});

export type TaskFormData = z.infer<typeof schema>;

interface TaskFormProps {
  defaultValues?: Partial<TaskFormData>;
  employees: Employee[];
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  color: 'var(--color-slate)',
  display: 'block',
  marginBottom: '4px',
};

const selectStyle: React.CSSProperties = {
  height: '36px',
  width: '100%',
  padding: '0 10px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  fontSize: '14px',
  color: 'var(--color-ink)',
  background: 'var(--color-surface)',
};

export default function TaskForm({
  defaultValues,
  employees,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      priority: 'medium',
      status: 'pending',
      ...defaultValues,
      dueDate: defaultValues?.dueDate ? formatDateInput(defaultValues.dueDate) : '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Input label="Title" placeholder="Task title" error={errors.title?.message} {...register('title')} />

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          placeholder="Optional description"
          rows={3}
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            fontFamily: 'var(--font-ui)',
            resize: 'vertical',
          }}
          {...register('description')}
        />
      </div>

      <div>
        <label style={labelStyle}>Employee *</label>
        <select style={selectStyle} {...register('employeeId')}>
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>{emp.name}</option>
          ))}
        </select>
        {errors.employeeId && (
          <span style={{ fontSize: '12px', color: 'var(--color-danger)' }}>{errors.employeeId.message}</span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Priority</label>
          <select style={selectStyle} {...register('priority')}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Status</label>
          <select style={selectStyle} {...register('status')}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <Input label="Due Date" type="date" error={errors.dueDate?.message} {...register('dueDate')} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
