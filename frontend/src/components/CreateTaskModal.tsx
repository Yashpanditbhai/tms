import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { createTask } from '../features/taskSlice';
import { fetchUsers } from '../features/userSlice';
import Modal from './Modal';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import ModalFooter from './ModalFooter';
import toast from 'react-hot-toast';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);
  const { loading } = useSelector((state: RootState) => state.tasks);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUsers());
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setErrors({});
    }
  }, [isOpen, dispatch]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!assignedTo) newErrors.assignedTo = 'Please select a user';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(createTask({ title, description, assignedTo })).unwrap();
      toast.success('Task created successfully');
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err || 'Failed to create task');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Task">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Task title" placeholder="Enter the task title" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
        <Textarea label="Description" rows={4} placeholder="Briefly describe what needs to be done" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select label="Assigned User Dropdown" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} error={errors.assignedTo}>
          <option value="">Assign to</option>
          {users.filter((u) => u.role === 'user').map((user) => (
            <option key={user._id} value={user._id}>{user.name} ({user.email})</option>
          ))}
        </Select>
        <ModalFooter onCancel={onClose} submitLabel="Create Task" loading={loading} />
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
