import React from 'react';
import type { Task } from '../types';
import StatusBadge from './StatusBadge';
import Button from './Button';
import { formatDate } from '../utils/formatDate';

interface TaskTableProps {
  tasks: Task[];
  role: 'admin' | 'user';
  onView: (task: Task) => void;
  onUpdateStatus?: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, role, onView, onUpdateStatus }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-500 text-sm">No tasks found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">Assigned To</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">Task Title</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">
                {role === 'admin' ? 'Assigned To' : 'Assigned By'}
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">Status</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">Created On</th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-400 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-dashed border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">
                    #{task.taskId || task._id.slice(-6).toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{task.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {role === 'admin' ? task.assignedTo?.name || 'Unassigned' : task.createdBy?.name || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{formatDate(task.createdAt)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="!py-1.5 !px-4 !text-xs !rounded-lg" onClick={() => onView(task)}>
                      View
                    </Button>
                    {role === 'user' && onUpdateStatus && (
                      <Button variant="primary" className="!py-1.5 !px-4 !text-xs !rounded-lg" onClick={() => onUpdateStatus(task)}>
                        Update Status
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
