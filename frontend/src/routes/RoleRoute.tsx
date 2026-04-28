import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

interface RoleRouteProps {
  role: 'admin' | 'user';
}

const RoleRoute: React.FC<RoleRouteProps> = ({ role }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role !== role) {
    const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
