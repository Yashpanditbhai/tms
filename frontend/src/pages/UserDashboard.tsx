import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { fetchMyTasks, fetchTaskStats } from '../features/taskSlice';
import type { Task } from '../types';
import StatCard from '../components/StatCard';
import FilterTabs from '../components/FilterTabs';
import TaskTable from '../components/TaskTable';
import TaskDetailsModal from '../components/TaskDetailsModal';
import UpdateStatusModal from '../components/UpdateStatusModal';
import Loader from '../components/Loader';

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, stats, loading, filters } = useSelector((state: RootState) => state.tasks);

  const [activeFilter, setActiveFilter] = useState('');
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [statusTask, setStatusTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchMyTasks());
    dispatch(fetchTaskStats());
  }, [dispatch]);

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
          t.createdBy?.name?.toLowerCase().includes(search)
      );
    }
    return result;
  }, [tasks, activeFilter, filters.search]);

  const refreshData = () => {
    dispatch(fetchMyTasks());
    dispatch(fetchTaskStats());
  };

  if (loading && tasks.length === 0) return <Loader />;

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        <StatCard
          label="My Tasks"
          sublabel="All tasks assigned to you"
          value={stats?.total || 0}
          color="blue"
        />
        <StatCard
          label="Pending Tasks"
          sublabel="Tasks waiting to be started"
          value={stats?.pending || 0}
          color="orange"
        />
        <StatCard
          label="In Progress"
          sublabel="Tasks you're currently working on"
          value={stats?.['in-progress'] || 0}
          color="purple"
        />
        <StatCard
          label="Completed Tasks"
          sublabel="Tasks you've finished"
          value={stats?.completed || 0}
          color="green"
        />
      </div>

      {/* Tasks Section */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">My Tasks</h2>
        <p className="text-sm text-gray-400 mt-1">Track and update your assigned tasks.</p>
      </div>

      <div className="mb-5">
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <TaskTable
        tasks={filteredTasks}
        role="user"
        onView={(task) => setViewTask(task)}
        onUpdateStatus={(task) => setStatusTask(task)}
      />

      {/* View Task Modal */}
      <TaskDetailsModal
        isOpen={!!viewTask}
        task={viewTask}
        onClose={() => setViewTask(null)}
        onUpdateStatus={(task) => {
          setViewTask(null);
          setStatusTask(task);
        }}
      />

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={!!statusTask}
        task={statusTask}
        onClose={() => setStatusTask(null)}
        onSuccess={refreshData}
        role="user"
      />
    </div>
  );
};

export default UserDashboard;
