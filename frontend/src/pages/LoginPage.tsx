import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { login, clearError } from '../features/authSlice';
import AuthIllustration from '../components/AuthIllustration';
import Input from '../components/Input';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(login({ email, password }));
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <AuthIllustration />

      <div className="flex-1 flex items-center justify-center px-4 sm:p-8 bg-white">
        <div className="w-full max-w-[420px]">
          <div className="text-center mb-9">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back 👋
            </h2>
            <p className="text-gray-500 text-sm">
              Log in to manage your tasks and track progress.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Input
                label="Email address"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>
            <div className="mb-2">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>

            <div className="text-right mb-6">
              <button
                type="button"
                className="bg-transparent border-none text-indigo-600 text-[13px] font-medium cursor-pointer hover:text-indigo-700"
              >
                Forgot your password?
              </button>
            </div>

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold no-underline hover:text-indigo-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
