import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { setRole } from '../features/authSlice';
import AuthIllustration from '../components/AuthIllustration';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RoleSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();

  const handleRoleSelect = async (role: 'admin' | 'user') => {
    try {
      await api.patch('/auth/select-role', { role });
      dispatch(setRole(role));
      toast.success(`Continuing as ${role}`);
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch {
      dispatch(setRole(role));
      navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <AuthIllustration />

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[520px]">
          <div className="text-center mb-9">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Choose Your Role
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Select how you want to use the dashboard.
              <br />
              You can't change this later without admin support.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Admin Card */}
            <div className="border-2 border-indigo-200 rounded-2xl p-7 cursor-pointer transition-all hover:border-indigo-400 hover:shadow-lg">
              <h3 className="text-xl font-bold text-indigo-600 mb-2">
                Admin
              </h3>
              <p className="text-[13px] text-gray-500 mb-4">
                Create, assign, and manage tasks across all users.
              </p>
              <ul className="text-[13px] text-gray-600 list-none p-0 mb-6 space-y-1.5">
                <li>• Create, edit, and delete tasks</li>
                <li>• Assign tasks to users</li>
                <li>• View all tasks and users</li>
              </ul>
              <button
                onClick={() => handleRoleSelect('admin')}
                className="w-full py-2.5 bg-indigo-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                Continue as Admin
              </button>
            </div>

            {/* User Card */}
            <div className="border-2 border-gray-200 rounded-2xl p-7 cursor-pointer transition-all hover:border-gray-400 hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                User
              </h3>
              <p className="text-[13px] text-gray-500 mb-4">
                View and manage tasks assigned to you.
              </p>
              <ul className="text-[13px] text-gray-600 list-none p-0 mb-6 space-y-1.5">
                <li>• View assigned tasks</li>
                <li>• Update task status</li>
                <li>• Track your progress</li>
              </ul>
              <button
                onClick={() => handleRoleSelect('user')}
                className="w-full py-2.5 bg-white text-gray-700 border-[1.5px] border-gray-300 rounded-lg text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Continue as User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
