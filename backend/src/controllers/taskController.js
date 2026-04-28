import * as taskService from '../services/taskService.js';

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (search) filters.search = search;

    const result = await taskService.getAllTasks(filters, parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.user._id, req.user.role);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (search) filters.search = search;

    const result = await taskService.getTasksByUser(req.user._id, filters, parseInt(page), parseInt(limit));

    res.status(200).json({
      success: true,
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskStats = async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats(req.user._id, req.user.role);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
