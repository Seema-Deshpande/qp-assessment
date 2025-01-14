import { Request, Response } from 'express';
import { GroceryService } from '../services/groceryService';

export const addNewGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, inventory } = req.body;
    const newItem = await GroceryService.createGroceryItem(name, price, inventory);
    res.status(201).json({message: 'Grocery item added successfully', item: newItem});
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

// remove grocery item id
export const removeGroceryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const  itemId = parseInt(id);
    const deleteItem =  await GroceryService.removeGroceryItem(itemId);
    if (!deleteItem) {
      res.status(404).json({ message: 'Item not found'  });
    }
    res.status(200).json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing grocery item', error });
  }
}

export const updateGroceryItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, inventory } = req.body;
  try {
    const updatedItem = await GroceryService.updateGroceryItem(id, { name, price, inventory });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ "message": "Grocery item updated successfully", item: updatedItem});
  } catch (error) {
    res.status(500).json({ message: 'Error updating grocery item', error });
  }
}

export  const adjustInventory = async (req: Request, res: Response) => {
const { id } = req.params;
const { quantity } = req.body;
try{
  const updatedItem = await GroceryService.adjustInventory(id, quantity);

  if(!updatedItem) {
    return res.status(404).json({ message: 'Item not found'})
  }
  res.status(200).json({ "message": "Inventory updated successfully", item: updatedItem});
} catch (error) {
  res.status(500).json({ message: 'Error adjusting inventory', error });
}
}

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const items = await GroceryService.getAllOrders();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grocery orders', error });
  }
}

