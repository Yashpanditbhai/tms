import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'user']).optional().default('user'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional().default(''),
  status: z.enum(['pending', 'in-progress', 'completed']).optional().default('pending'),
  assignedTo: z.string().min(1, 'Assigned user is required'),
  dueDate: z.string().datetime({ offset: true }).optional().nullable(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().datetime({ offset: true }).optional().nullable(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed'], {
    required_error: 'Status is required',
  }),
});

export const updateRoleSchema = z.object({
  role: z.enum(['admin', 'user'], {
    required_error: 'Role is required',
  }),
});
