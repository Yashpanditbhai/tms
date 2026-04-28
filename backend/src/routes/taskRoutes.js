import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
  getTaskStats,
} from '../controllers/taskController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from '../utils/validators.js';

const router = Router();

router.use(verifyToken);

router.post('/', requireRole('admin'), validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.get('/stats', getTaskStats);
router.get('/my-tasks', getMyTasks);
router.get('/:id', getTaskById);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', requireRole('admin'), deleteTask);

export default router;
