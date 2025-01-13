import { Router } from 'express';
import { addNewGroceryItem, getGroceryItems } from '../controllers/adminController';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/grocery-items', isAuthenticated, isAdmin, addNewGroceryItem);
router.get('/grocery-items', isAuthenticated, isAdmin, getGroceryItems);

export { router as adminRoutes };
