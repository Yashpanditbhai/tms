import React from 'react';
import type { Task } from '../types';
import Modal from './Modal';
import TaskInfo from './TaskInfo';
import ActivityTimeline from './ActivityTimeline';
import ModalFooter from './ModalFooter';
import { statusColors, statusLabels } from '../utils/statusConfig';

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

  const colors = statusColors[task.status] || statusColors.pending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Status" maxWidth="max-w-xl">
      <div className="space-y-5">
        <div className={`flex items-center justify-between p-4 rounded-xl ${colors.bg}`}>
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

        <TaskInfo task={task} role="user" showStatus={false} />

        <ActivityTimeline task={task} />

        <ModalFooter
          onCancel={onClose}
          onSubmit={() => onUpdateStatus(task)}
          cancelLabel="Close"
          submitLabel="Update Task"
          type="button"
        />
      </div>
    </Modal>
  );
};

export default TaskDetailsModal;
