import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { fetchTasks, fetchTaskStats, setSelectedTask, clearSelectedTask } from '../features/taskSlice';
import type { Task } from '../types';
import FilterTabs from '../components/FilterTabs';
import TaskTable from '../components/TaskTable';
import TaskDetailsPanel from '../components/TaskDetailsPanel';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import UpdateStatusModal from '../components/UpdateStatusModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Button from '../components/Button';
import Loader from '../components/Loader';

const AdminTasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const { tasks, selectedTask, loading, filters } = useSelector((state: RootState) => state.tasks);

  const [activeFilter, setActiveFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [statusTask, setStatusTask] = useState<Task | null>(null);
  const [deleteTaskItem, setDeleteTaskItem] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTaskStats());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setShowCreate(true);
    }
  }, [searchParams]);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (activeFilter) {
      result = result.filter((t) => t.status === activeFilter);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.taskId?.toLowerCase().includes(search) ||
          t.assignedTo?.name?.toLowerCase().includes(search)
      );
    }
    return result;
  }, [tasks, activeFilter, filters.search]);

  const handleView = (task: Task) => {
    dispatch(setSelectedTask(task));
  };

  const handleClosePanel = () => {
    dispatch(clearSelectedTask());
  };

  const refreshData = () => {
    dispatch(fetchTasks());
    dispatch(fetchTaskStats());
    handleClosePanel();
  };

  if (loading && tasks.length === 0) return <Loader />;

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage, assign, and track tasks across your team.
        </p>
      </div>

      {/* Filters + Create Task */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <Button variant="primary" className="!rounded-xl w-full sm:w-auto" onClick={() => setShowCreate(true)}>
          Create Task
        </Button>
      </div>

      {/* Table + Side Panel */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <TaskTable tasks={filteredTasks} role="admin" onView={handleView} />
        </div>

        {selectedTask && (
          <div className="w-full lg:w-[35%] shrink-0">
            <TaskDetailsPanel
              task={selectedTask}
              onClose={handleClosePanel}
              onEdit={(task) => {
                setEditTask(task);
              }}
              onDelete={(task) => {
                setDeleteTaskItem(task);
              }}
              onUpdateStatus={(task) => {
                setStatusTask(task);
              }}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={refreshData}
      />

      <EditTaskModal
        isOpen={!!editTask}
        task={editTask}
        onClose={() => setEditTask(null)}
        onSuccess={refreshData}
      />

      <UpdateStatusModal
        isOpen={!!statusTask}
        task={statusTask}
        onClose={() => setStatusTask(null)}
        onSuccess={refreshData}
        role="admin"
      />

      <DeleteConfirmModal
        isOpen={!!deleteTaskItem}
        task={deleteTaskItem}
        onClose={() => setDeleteTaskItem(null)}
        onSuccess={refreshData}
      />
    </div>
  );
};

export default AdminTasksPage;
