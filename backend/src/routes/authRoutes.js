import { Router } from 'express';
import { register, login, selectRole } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../utils/validators.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.patch('/select-role', verifyToken, selectRole);

export default router;
