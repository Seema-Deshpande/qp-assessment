import { Request, Response } from 'express';
import { GroceryService } from '../services/groceryService';

export const addNewGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, inventory } = req.body;
    const newItem = await GroceryService.createGroceryItem(name, price, inventory);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding grocery item', error });
  }
};

export const getGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery items', error });
  }
};
