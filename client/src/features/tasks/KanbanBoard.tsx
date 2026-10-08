import React, { useState } from 'react';
import Badge from '../../components/ui/Badge';
import type { Task, TaskStatus, Employee } from '../../types';
import { formatDate } from '../../utils/format';

interface KanbanBoardProps {
  tasks: Task[];
  onStatusChange: (task: Task, status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const COLUMNS: { status: TaskStatus; label: string; accent: string }[] = [
  { status: 'pending', label: 'Pending', accent: 'var(--color-warning)' },
  { status: 'in_progress', label: 'In progress', accent: 'var(--color-info)' },
  { status: 'completed', label: 'Complete', accent: 'var(--color-success)' },
];

function getEmployeeName(employeeId: string | Employee): string {
  if (typeof employeeId === 'object' && employeeId !== null) return employeeId.name;
  return '—';
}

export default function KanbanBoard({ tasks, onStatusChange, onEdit, onDelete }: KanbanBoardProps) {
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task._id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingId(task._id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const task = tasks.find((t) => t._id === taskId);
    if (task && task.status !== status) {
      onStatusChange(task, status);
    }
    setDragOverColumn(null);
    setDraggingId(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        alignItems: 'start',
      }}
    >
      {COLUMNS.map(({ status, label, accent }) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        const isOver = dragOverColumn === status;

        return (
          <div
            key={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              background: isOver ? 'rgba(26,107,69,0.04)' : 'var(--color-surface-subtle)',
              border: `1.5px ${isOver ? 'dashed' : 'solid'} ${isOver ? 'var(--color-primary)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              transition: 'border-color 0.14s, background 0.14s',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 14px',
                background: 'var(--color-surface)',
                borderBottom: `2px solid ${accent}`,
              }}
            >
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-ink)' }}>
                {label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11.5px',
                  fontWeight: 500,
                  color: 'var(--color-slate)',
                  background: 'var(--color-app-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '999px',
                  padding: '1px 7px',
                }}
              >
                {columnTasks.length}
              </span>
            </div>

            <div
              style={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minHeight: '140px',
              }}
            >
              {columnTasks.map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onDragEnd={handleDragEnd}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '11px 12px',
                    cursor: 'grab',
                    opacity: draggingId === task._id ? 0.4 : 1,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'opacity 0.12s, box-shadow 0.12s',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (draggingId !== task._id) {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(17,24,39,0.10)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '13.5px',
                      color: 'var(--color-ink)',
                      lineHeight: 1.35,
                      marginBottom: task.description ? '5px' : '0',
                    }}
                  >
                    {task.title}
                  </div>

                  {task.description && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--color-muted-slate)',
                        lineHeight: 1.45,
                        marginBottom: '8px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {task.description}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      gap: '6px',
                    }}
                  >
                    <Badge type="priority" value={task.priority} />
                    <span style={{ fontSize: '11.5px', color: 'var(--color-muted-slate)' }}>
                      {getEmployeeName(task.employeeId)}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    <span style={{ fontSize: '11.5px', color: 'var(--color-muted-slate)' }}>
                      {formatDate(task.dueDate)}
                    </span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button
                        onClick={() => onEdit(task)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '11.5px',
                          color: 'var(--color-slate)',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 500,
                          lineHeight: 1,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--color-surface-subtle)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(task)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '11.5px',
                          color: 'var(--color-danger)',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 500,
                          lineHeight: 1,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = 'var(--color-danger-bg)')
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {columnTasks.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80px',
                    fontSize: '12.5px',
                    color: 'var(--color-muted-slate)',
                  }}
                >
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
