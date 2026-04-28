import React from 'react';
import type { Task } from '../types';
import Modal from './Modal';
import StatusBadge from './StatusBadge';
import Button from './Button';

interface TaskDetailsModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdateStatus: (task: Task) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  task,
  onClose,
  onUpdateStatus,
}) => {
  if (!task) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" maxWidth="max-w-xl">
      <div className="space-y-5">
        {/* Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status:</span>
            <StatusBadge status={task.status} />
          </div>
          <button
            onClick={() => onUpdateStatus(task)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Update status
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</label>
            <p className="text-sm font-medium text-gray-900 mt-1">{task.title}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</label>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-600">
                {task.createdBy?.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <span className="text-sm text-gray-900">{task.createdBy?.name || 'Unknown'}</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Task ID</label>
            <p className="text-sm font-mono text-gray-600 mt-1">#{task.taskId || task._id.slice(-6).toUpperCase()}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</label>
            <p className="text-sm text-gray-600 mt-1">{task.description || 'No description provided'}</p>
          </div>
        </div>

        {/* Activity History */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Activity History</h4>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-1" />
                <div className="w-0.5 flex-1 bg-gray-200" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Task created by {task.createdBy?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400">{formatDate(task.createdAt)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 mt-1" />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  {task.status === 'pending'
                    ? 'Task not started'
                    : task.status === 'in-progress'
                    ? 'Task in progress'
                    : 'Task completed'}
                </p>
                {task.updatedAt !== task.createdAt && (
                  <p className="text-xs text-gray-400">{formatDate(task.updatedAt)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button variant="primary" onClick={() => onUpdateStatus(task)} className="flex-1">
            Update Task
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
