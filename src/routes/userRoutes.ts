import { Router } from 'express';
import { createOrder, getAvailableGroceryItems, getUserOrders } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/authMiddleware';
import { getGroceryItems } from 'controllers/adminController';

const router = Router();

router.get('/grocery-items', isAuthenticated, getAvailableGroceryItems);
router.post('/orders', isAuthenticated, createOrder)
router.get('/orders/:id', isAuthenticated, getUserOrders)

export { router as userRoutes };
