import { Router } from 'express';
import { signUpUser, loginUser } from '../controllers/authController';

const router = Router()
router.post('/signup', signUpUser);
router.post('/login', loginUser);

export  { router as authRoutes };

