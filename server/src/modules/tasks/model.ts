import mongoose, { Document, Schema } from 'mongoose';
import { TASK_STATUSES, TASK_PRIORITIES } from '../../constants';
import type { TaskStatus, TaskPriority } from '../../constants';

export interface ITask extends Document {
  title: string;
  description: string;
  employeeId: mongoose.Types.ObjectId;
  priority: TaskPriority;
  dueDate: Date;
  status: TaskStatus;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      index: true,
    },
    priority: { type: String, enum: TASK_PRIORITIES, required: true },
    dueDate: { type: Date, required: true, index: true },
    status: { type: String, enum: TASK_STATUSES, required: true, default: 'pending', index: true },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);
