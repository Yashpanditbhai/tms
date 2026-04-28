import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { logout as logoutAction } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const logout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    logout,
    isAdmin: user?.role === 'admin',
  };
};

export default useAuth;
