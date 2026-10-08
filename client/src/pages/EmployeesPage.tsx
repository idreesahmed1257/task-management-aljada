import React, { useEffect, useState, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import EmployeeTable from '../features/employees/EmployeeTable';
import EmployeeForm, { type EmployeeFormData } from '../features/employees/EmployeeForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { useToast } from '../components/feedback/Toast';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeesApi';
import type { Employee } from '../types';

export default function EmployeesPage() {
  const { showToast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getEmployees(search || undefined);
      setEmployees(data);
    } catch {
      setError('Failed to load employees.');
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (emp: Employee) => { setEditTarget(emp); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data: EmployeeFormData) => {
    try {
      if (editTarget) {
        await updateEmployee(editTarget._id, data);
        showToast('Employee updated.', 'success');
      } else {
        await createEmployee(data);
        showToast('Employee added.', 'success');
      }
      closeModal();
      load();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed.';
      showToast(msg, 'error');
      throw err;
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteEmployee(deleteTarget._id);
      showToast('Employee deleted.', 'success');
      setDeleteTarget(null);
      load();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Delete failed.';
      showToast(msg, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--color-ink)' }}>
          Employees
        </h1>
        <Button variant="primary" icon={<UserPlus size={15} />} onClick={openAdd}>
          Add Employee
        </Button>
      </div>

      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '280px' }}
          />
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-primary)' }}>
            <Spinner size={28} />
          </div>
        ) : error ? (
          <div style={{ padding: '20px', color: 'var(--color-danger)', fontSize: '14px' }}>{error}</div>
        ) : (
          <EmployeeTable employees={employees} onEdit={openEdit} onDelete={setDeleteTarget} />
        )}
      </div>

      <Modal open={modalOpen} title={editTarget ? 'Edit Employee' : 'Add Employee'} onClose={closeModal}>
        <EmployeeForm
          defaultValues={editTarget ? { name: editTarget.name, email: editTarget.email, position: editTarget.position } : undefined}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={editTarget ? 'Update' : 'Add Employee'}
        />
      </Modal>

      <Modal open={!!deleteTarget} title="Delete Employee" onClose={() => setDeleteTarget(null)}>
        <p style={{ fontSize: '14px', color: 'var(--color-slate)', marginBottom: '20px' }}>
          Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={deleteLoading} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
