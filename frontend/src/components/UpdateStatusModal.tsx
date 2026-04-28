import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { updateTaskStatus } from '../features/taskSlice';
import type { Task } from '../types';
import Modal from './Modal';
import Select from './Select';
import TaskInfo from './TaskInfo';
import ModalFooter from './ModalFooter';
import toast from 'react-hot-toast';

interface UpdateStatusModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSuccess: () => void;
  role: 'admin' | 'user';
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ isOpen, task, onClose, onSuccess, role }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) setStatus(task.status);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Status">
      <form onSubmit={handleSubmit} className="space-y-5">
        <TaskInfo task={task} role={role} showDescription={false} />

        <Select label="Update status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>

        <p className="text-xs text-gray-400">
          Changing the status will update it for the {role === 'admin' ? 'assigned user' : 'admin'}.
        </p>

        <ModalFooter onCancel={onClose} submitLabel="Save Changes" loading={loading} />
      </form>
    </Modal>
  );
};

export default UpdateStatusModal;
