import React from 'react';
import type { Task } from '../types';
import Button from './Button';
import CloseButton from './CloseButton';
import { statusColors, statusLabels } from '../utils/statusConfig';

interface TaskDetailsPanelProps {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onUpdateStatus: (task: Task) => void;
}

const TaskDetailsPanel: React.FC<TaskDetailsPanelProps> = ({
  task,
  onClose,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${month} ${day}, ${year}, ${time}`;
  };

  const colors = statusColors[task.status] || statusColors.pending;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Task Details</h3>
          <CloseButton onClick={onClose} />
        </div>

        {/* Status Bar */}
        <div className={`flex items-center justify-between mb-6 p-4 rounded-xl ${colors.bg}`}>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Status</p>
            <p className={`text-sm font-semibold ${colors.text}`}>{statusLabels[task.status]}</p>
          </div>
          <button
            onClick={() => onUpdateStatus(task)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Update status
          </button>
        </div>

        {/* Details */}
        <div className="space-y-5 mb-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">Task Title</p>
            <p className="text-sm font-semibold text-gray-900">{task.title}</p>
          </div>

          <div className="flex gap-8">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Assigned To</p>
              <p className="text-sm font-medium text-gray-900">{task.assignedTo?.name || 'Unassigned'}</p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Task ID</p>
              <p className="text-sm font-medium text-gray-600">#{task.taskId || task._id.slice(-6).toUpperCase()}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Description</p>
            <p className="text-sm text-gray-600">{task.description || 'No description provided for this task.'}</p>
          </div>
        </div>

        {/* Activity History */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Activity History</h4>
          <div className="space-y-0">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gray-800 mt-0.5" />
                <div className="w-0 flex-1 border-l-2 border-dashed border-gray-300 my-1" />
              </div>
              <div className="pb-3">
                <p className="text-sm text-gray-700">Task created by {task.createdBy?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400">{formatDate(task.createdAt)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-gray-300 bg-white mt-0.5" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {task.status === 'pending'
                    ? 'Task not started'
                    : task.status === 'in-progress'
                    ? 'Task in progress'
                    : 'Task completed'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={() => onDelete(task)} className="flex-1">
            Delete
          </Button>
          <Button variant="primary" onClick={() => onEdit(task)} className="flex-1">
            Edit Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPanel;
