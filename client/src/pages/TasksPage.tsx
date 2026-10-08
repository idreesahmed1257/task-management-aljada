import React, { useEffect, useState, useCallback } from 'react';
import { Plus, List, Columns } from 'lucide-react';
import TaskTable from '../features/tasks/TaskTable';
import KanbanBoard from '../features/tasks/KanbanBoard';
import TaskForm, { type TaskFormData } from '../features/tasks/TaskForm';
import TaskFiltersBar from '../features/tasks/TaskFilters';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { useToast } from '../components/feedback/Toast';
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from '../services/tasksApi';
import { getEmployees } from '../services/employeesApi';
import type { Task, Employee, TaskFilters, TaskStatus } from '../types';

type View = 'list' | 'board';

export default function TasksPage() {
  const { showToast } = useToast();
  const [view, setView] = useState<View>('list');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<TaskFilters>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const effectiveFilters = view === 'board' ? { ...filters, status: undefined } : filters;
      const [taskData, empData] = await Promise.all([getTasks(effectiveFilters), getEmployees()]);
      setTasks(taskData);
      setEmployees(empData);
    } catch {
      setError('Failed to load tasks.');
    } finally {
      setIsLoading(false);
    }
  }, [filters, view]);

  useEffect(() => { load(); }, [load]);

  const handleViewChange = (next: View) => {
    setView(next);
    if (next === 'board' && filters.status) {
      setFilters((f) => { const { status, ...rest } = f; return rest; });
    }
  };

  const openAdd = () => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (task: Task) => { setEditTarget(task); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data: TaskFormData) => {
    try {
      if (editTarget) {
        await updateTask(editTarget._id, data);
        showToast('Task updated.', 'success');
      } else {
        await createTask(data);
        showToast('Task created.', 'success');
      }
      closeModal();
      load();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed.';
      showToast(msg, 'error');
      throw err;
    }
  };

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    try {
      await updateTaskStatus(task._id, status);
      showToast('Status updated.', 'success');
      load();
    } catch {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteTask(deleteTarget._id);
      showToast('Task deleted.', 'success');
      setDeleteTarget(null);
      load();
    } catch {
      showToast('Delete failed.', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const getEditDefaults = (): Partial<TaskFormData> | undefined => {
    if (!editTarget) return undefined;
    return {
      title: editTarget.title,
      description: editTarget.description,
      employeeId: typeof editTarget.employeeId === 'object' ? editTarget.employeeId._id : editTarget.employeeId,
      priority: editTarget.priority,
      dueDate: editTarget.dueDate,
      status: editTarget.status,
    };
  };

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--color-ink)' }}>
          Tasks
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* List / Board toggle */}
          <div
            style={{
              display: 'flex',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
            }}
          >
            {(['list', 'board'] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => handleViewChange(v)}
                title={v === 'list' ? 'List view' : 'Board view'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  border: 'none',
                  background: view === v ? 'var(--color-primary)' : 'transparent',
                  color: view === v ? '#fff' : 'var(--color-slate)',
                  cursor: 'pointer',
                  transition: 'background 0.14s, color 0.14s',
                }}
              >
                {v === 'list' ? <List size={15} /> : <Columns size={15} />}
              </button>
            ))}
          </div>

          <Button variant="primary" icon={<Plus size={15} />} onClick={openAdd}>
            New Task
          </Button>
        </div>
      </div>

      {/* Content panel */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: view === 'board' ? 'visible' : 'hidden',
        }}
      >
        {/* Filters bar */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
          <TaskFiltersBar
            employees={employees}
            filters={filters}
            onChange={setFilters}
            hideStatus={view === 'board'}
          />
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px', color: 'var(--color-primary)' }}>
            <Spinner size={28} />
          </div>
        ) : error ? (
          <div style={{ padding: '20px', color: 'var(--color-danger)', fontSize: '14px' }}>{error}</div>
        ) : view === 'list' ? (
          <TaskTable
            tasks={tasks}
            onEdit={openEdit}
            onDelete={setDeleteTarget}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div style={{ padding: '14px' }}>
            <KanbanBoard
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          </div>
        )}
      </div>

      <Modal open={modalOpen} title={editTarget ? 'Edit Task' : 'New Task'} onClose={closeModal} maxWidth={520}>
        <TaskForm
          defaultValues={getEditDefaults()}
          employees={employees}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          submitLabel={editTarget ? 'Update' : 'Create Task'}
        />
      </Modal>

      <Modal open={!!deleteTarget} title="Delete Task" onClose={() => setDeleteTarget(null)}>
        <p style={{ fontSize: '14px', color: 'var(--color-slate)', marginBottom: '20px' }}>
          Are you sure you want to delete <strong>{deleteTarget?.title}</strong>? This cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={deleteLoading} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
