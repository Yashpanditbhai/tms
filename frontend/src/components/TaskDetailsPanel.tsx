import React from 'react';
import type { Task } from '../types';
import Button from './Button';
import CloseButton from './CloseButton';
import TaskInfo from './TaskInfo';
import ActivityTimeline from './ActivityTimeline';
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
  const colors = statusColors[task.status] || statusColors.pending;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-y-auto animate-slide-in-right">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Task Details</h3>
          <CloseButton onClick={onClose} />
        </div>

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

        <div className="mb-6">
          <TaskInfo task={task} showStatus={false} />
        </div>

        <div className="mb-6">
          <ActivityTimeline task={task} />
        </div>

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
