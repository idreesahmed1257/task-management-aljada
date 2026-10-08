import { Employee } from '../employees/model';
import { Task } from '../tasks/model';

export async function getSummary() {
  const [totalEmployees, totalTasks, pendingTasks, inProgressTasks, completedTasks] =
    await Promise.all([
      Employee.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({ status: 'pending' }),
      Task.countDocuments({ status: 'in_progress' }),
      Task.countDocuments({ status: 'completed' }),
    ]);

  return { totalEmployees, totalTasks, pendingTasks, inProgressTasks, completedTasks };
}

export async function getChartData() {
  const [high, medium, low, byEmployee] = await Promise.all([
    Task.countDocuments({ priority: 'high' }),
    Task.countDocuments({ priority: 'medium' }),
    Task.countDocuments({ priority: 'low' }),
    Task.aggregate([
      { $group: { _id: '$employeeId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
      { $lookup: { from: 'employees', localField: '_id', foreignField: '_id', as: 'emp' } },
      { $unwind: '$emp' },
      { $project: { _id: 0, name: '$emp.name', count: 1 } },
    ]),
  ]);

  return {
    byPriority: { high, medium, low },
    byEmployee: byEmployee as Array<{ name: string; count: number }>,
  };
}
