import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register(name, email, password, role);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const selectRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!role || !['admin', 'user'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const User = (await import('../models/User.js')).default;
    const user = await User.findByIdAndUpdate(req.user._id, { role }, { new: true });

    res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};
