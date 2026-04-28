import React from 'react';
import type { Task } from '../types';
import { statusColors, statusLabels } from '../utils/statusConfig';

interface TaskInfoProps {
  task: Task;
  role?: 'admin' | 'user';
  showStatus?: boolean;
  showDescription?: boolean;
}

const TaskInfo: React.FC<TaskInfoProps> = ({ task, role = 'admin', showStatus = true, showDescription = true }) => {
  const colors = statusColors[task.status] || statusColors.pending;

  return (
    <div className="space-y-5">
      {showStatus && (
        <div className={`flex items-center justify-between p-4 rounded-xl ${colors.bg}`}>
          <span className="text-sm text-gray-500">Status</span>
          <span className={`text-sm font-semibold ${colors.text}`}>{statusLabels[task.status]}</span>
        </div>
      )}

      <div>
        <p className="text-xs text-gray-400 mb-1">Task Title</p>
        <p className="text-sm font-semibold text-gray-900">{task.title}</p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">
            {role === 'admin' ? 'Assigned To' : 'Assigned By'}
          </p>
          <p className="text-sm font-medium text-gray-900">
            {role === 'admin'
              ? task.assignedTo?.name || 'Unassigned'
              : task.createdBy?.name || 'Unknown'}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">Task ID</p>
          <p className="text-sm font-medium text-gray-600">
            #{task.taskId || task._id.slice(-6).toUpperCase()}
          </p>
        </div>
      </div>

      {showDescription && (
        <div>
          <p className="text-xs text-gray-400 mb-1">Description</p>
          <p className="text-sm text-gray-600">
            {task.description || 'No description provided for this task.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskInfo;
