import { Router } from 'express';
import {
        addNewGroceryItem,
        adjustInventory,
        getAllOrders,
        getGroceryItems,
        removeGroceryItem,
        updateGroceryItem
    } from '../controllers/adminController';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/grocery-items', isAuthenticated, isAdmin, addNewGroceryItem);
router.get('/grocery-items', isAuthenticated, isAdmin, getGroceryItems);
router.delete('/grocery-items/:id', isAuthenticated, isAdmin, removeGroceryItem);
router.put('/grocery-items/:id',  isAuthenticated, isAdmin, updateGroceryItem);
router.patch('/grocery-items/:id/inventory', isAuthenticated, isAdmin, adjustInventory);
router.get('/grocery-items-orders', isAuthenticated, isAdmin,getAllOrders )

export { router as adminRoutes };
