import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { updateTaskStatus } from '../features/taskSlice';
import type { Task } from '../types';
import Modal from './Modal';
import Select from './Select';
import Button from './Button';
import { statusLabels, statusColors } from '../utils/statusConfig';
import toast from 'react-hot-toast';

interface UpdateStatusModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSuccess: () => void;
  role: 'admin' | 'user';
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  isOpen,
  task,
  onClose,
  onSuccess,
  role,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    setLoading(true);
    try {
      await dispatch(updateTaskStatus({ id: task._id, status })).unwrap();
      toast.success('Status updated successfully');
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  if (!task) return null;

  const colors = statusColors[task.status] || statusColors.pending;
  const label = statusLabels[task.status] || 'Pending';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Status">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Status Bar */}
        <div className={`flex items-center justify-between p-4 rounded-xl ${colors.bg}`}>
          <span className="text-sm text-gray-500">Status</span>
          <span className={`text-sm font-semibold ${colors.text}`}>{label}</span>
        </div>

        {/* Task Info */}
        <div className="border-b border-gray-100 pb-4">
          <p className="text-xs text-gray-400 mb-1">Task Title</p>
          <p className="text-sm font-semibold text-gray-900">{task.title}</p>
        </div>

        <div className="flex gap-8 border-b border-gray-100 pb-4">
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Assigned To</p>
            <p className="text-sm font-medium text-gray-900">
              {role === 'admin' ? task.assignedTo?.name : task.createdBy?.name}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Task ID</p>
            <p className="text-sm font-medium text-gray-600">
              #{task.taskId || task._id.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Update Status */}
        <Select
          label="Update status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>

        <p className="text-xs text-gray-400">
          Changing the status will update it for the {role === 'admin' ? 'assigned user' : 'admin'}.
        </p>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateStatusModal;
