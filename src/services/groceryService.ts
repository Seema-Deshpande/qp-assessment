import { GroceryItem } from '../models/groceryItem';
import { getRepository } from 'typeorm';

export class GroceryService {
  static async createGroceryItem(name: string, price: number, inventory: number) {
    const groceryRepository = getRepository(GroceryItem);
    const newItem = groceryRepository.create({ name, price, inventory });
    return await groceryRepository.save(newItem);
  }

  static async getAllItems() {
    const groceryRepository = getRepository(GroceryItem);
    return await groceryRepository.find();
  }
}
