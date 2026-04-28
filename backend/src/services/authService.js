import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import { AppError } from '../middleware/errorHandler.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (name, email, password, role = 'user') => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered.', 409);
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);

  return { user: formatUser(user), token };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError('Invalid email or password.', 401);
  }

  const token = generateToken(user._id);

  return { user: formatUser(user), token };
};

export default { register, login, generateToken };
