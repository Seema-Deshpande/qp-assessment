import { Request, Response } from 'express';
import { GroceryService } from '../services/groceryService';

export const getAvailableGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery items', error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { userId, orderItems } = req.body;

  try {
    // Validate the orderItems structure
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const newOrder = await GroceryService.createOrder(userId, orderItems);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
 const { id } = req.params;
 try{
    const userId = parseInt(id);
    if (!userId) {
        return res.status(400).json({ message: 'User not found' });
      }
      const userOrders = await GroceryService.getUserOrders(userId);
      res.status(200).json(userOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching orders' });
    }
}
