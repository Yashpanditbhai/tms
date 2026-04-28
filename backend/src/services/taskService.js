import Task from '../models/Task.js';
import { AppError } from '../middleware/errorHandler.js';

export const createTask = async (data, adminId) => {
  const task = await Task.create({ ...data, createdBy: adminId });
  return Task.findById(task._id).populate('assignedTo', 'name email').populate('createdBy', 'name email');
};

export const getAllTasks = async (filters = {}, page = 1, limit = 10) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    query.title = { $regex: filters.search, $options: 'i' };
  }

  if (filters.assignedTo) {
    query.assignedTo = filters.assignedTo;
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (id) => {
  const task = await Task.findById(id)
    .populate('assignedTo', 'name email')
    .populate('createdBy', 'name email');

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
};

export const updateTask = async (id, data, userId, userRole) => {
  const task = await Task.findById(id);

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  if (userRole === 'user') {
    if (task.assignedTo.toString() !== userId.toString()) {
      throw new AppError('You can only update tasks assigned to you.', 403);
    }
    // Regular users can only update status
    const { status } = data;
    if (!status) {
      throw new AppError('You can only update the status of your assigned tasks.', 403);
    }
    task.status = status;
  } else {
    // Admin can update anything
    Object.assign(task, data);
  }

  await task.save();

  return Task.findById(id).populate('assignedTo', 'name email').populate('createdBy', 'name email');
};

export const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    throw new AppError('Task not found.', 404);
  }

  return task;
};

export const getTasksByUser = async (userId, filters = {}, page = 1, limit = 10) => {
  const query = { assignedTo: userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    query.title = { $regex: filters.search, $options: 'i' };
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getTaskStats = async (userId, role) => {
  const matchStage = {};

  if (role === 'user' && userId) {
    matchStage.assignedTo = userId;
  }

  const stats = await Task.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    total: 0,
    pending: 0,
    'in-progress': 0,
    completed: 0,
  };

  stats.forEach((s) => {
    result[s._id] = s.count;
    result.total += s.count;
  });

  return result;
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,
  getTaskStats,
};
