import React from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';
import { setFilters } from '../features/taskSlice';
import useAuth from '../hooks/useAuth';

const TopBar: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 right-0 left-60 z-20">
      <div className="relative w-80">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search here..."
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-colors"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900 capitalize">{user?.role}</span>
      </div>
    </header>
  );
};

export default TopBar;
