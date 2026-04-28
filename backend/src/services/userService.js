import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAllUsers = async () => {
  return User.find().select('-__v').sort({ createdAt: -1 });
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-__v');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

export const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true }).select('-__v');

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
};

export default { getAllUsers, getUserById, updateUserRole };
