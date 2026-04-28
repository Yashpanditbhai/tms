import { Router } from 'express';
import { getUsers, getUserById, updateUserRole } from '../controllers/userController.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { updateRoleSchema } from '../utils/validators.js';

const router = Router();

router.use(verifyToken);
router.use(requireRole('admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id/role', validate(updateRoleSchema), updateUserRole);

export default router;
