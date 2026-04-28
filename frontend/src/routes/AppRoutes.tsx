import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import RoleSelectionPage from '../pages/RoleSelectionPage';
import AdminDashboard from '../pages/AdminDashboard';
import AdminTasksPage from '../pages/AdminTasksPage';
import UserDashboard from '../pages/UserDashboard';
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/role-selection" element={<RoleSelectionPage />} />

        {/* Admin Routes */}
        <Route element={<RoleRoute role="admin" />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/tasks" element={<AdminTasksPage />} />
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<RoleRoute role="user" />}>
          <Route element={<Layout />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
