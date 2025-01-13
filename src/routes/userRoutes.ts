import { Router } from 'express';
import { getGroceryItems } from '../controllers/adminController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.get('/grocery-items', isAuthenticated, getGroceryItems);

export { router as userRoutes };
