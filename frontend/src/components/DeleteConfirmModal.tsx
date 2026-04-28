import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { deleteTask } from '../features/taskSlice';
import type { Task } from '../types';
import Modal from './Modal';
import ModalFooter from './ModalFooter';
import toast from 'react-hot-toast';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, task, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!task) return;
    setLoading(true);
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task deleted successfully');
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete this task?">
      <div className="space-y-6">
        <p className="text-sm text-gray-400 text-center">
          This action cannot be undone. The task will be permanently removed.
        </p>
        <ModalFooter
          onCancel={onClose}
          onSubmit={handleDelete}
          submitLabel="Delete Task"
          submitVariant="danger"
          loading={loading}
          type="button"
        />
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
