import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { fetchTaskStats } from '../features/taskSlice';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';

const AdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { stats, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskStats());
  }, [dispatch]);

  if (loading && !stats) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 animate-fade-in">
        <StatCard
          label="Total Tasks"
          sublabel="All tasks created so far"
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
          label="In Progress Tasks"
          sublabel="Tasks currently being worked on"
          value={stats?.['in-progress'] || 0}
          color="purple"
        />
        <StatCard
          label="Completed Tasks"
          sublabel="Tasks finished successfully"
          value={stats?.completed || 0}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">Quick actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-[60%] animate-slide-up">
        <button
          onClick={() => navigate('/admin/tasks')}
          className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">All tasks</h3>
              <p className="text-sm text-gray-400">View and manage all posted tasks</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/admin/tasks?create=true')}
          className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Task</h3>
              <p className="text-sm text-gray-400">Create new task and post</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
