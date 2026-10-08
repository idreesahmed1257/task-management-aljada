import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import type { Employee } from '../../types';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  position: z.string().min(1, 'Position is required'),
});

export type EmployeeFormData = z.infer<typeof schema>;

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormData>;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input label="Name" placeholder="Jane Smith" error={errors.name?.message} {...register('name')} />
      <Input label="Email" type="email" placeholder="jane@example.com" error={errors.email?.message} {...register('email')} />
      <Input label="Position" placeholder="Software Engineer" error={errors.position?.message} {...register('position')} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
