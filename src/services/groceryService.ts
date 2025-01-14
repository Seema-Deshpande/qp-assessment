import { GroceryItem } from '../models/groceryItem';
import { getRepository } from 'typeorm';
import { Order } from '../models/order';
import { OrderItem } from '../models/orderItem';

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

  static  async removeGroceryItem(id: number) {
    const groceryRepository = getRepository(GroceryItem);
    const item  = await groceryRepository.findOne(id);
    if(!item) return null;
    await groceryRepository.remove(item);
    return true;
  }

  static  async updateGroceryItem(id: string, updates: { name?: string; price?: number; inventory?: number }) {
    const groceryRepository = getRepository(GroceryItem);
    const item = await groceryRepository.findOne(id);
    if (!item) return null;

    if (updates.name) item.name = updates.name;
    if (updates.price) item.price = updates.price;
    if (updates.inventory) item.inventory = updates.inventory;

    return await groceryRepository.save(item);
  }

  static async adjustInventory(id: string, quantity: number) {
    const groceryRepository = getRepository(GroceryItem);
    const item =  await groceryRepository.findOne(id);
    if (!item) return null;
    if(item.inventory === undefined) item.inventory = 0;
    item.inventory += quantity;  // Increase or decrease inventory
    return await groceryRepository.save(item);
  }

 static async createOrder(userId: number, orderItems: { groceryItemId: number; quantity: number }[]) {
  const orderRepository = getRepository(Order);
  const orderItemRepository = getRepository(OrderItem);
  const groceryRepository = getRepository(GroceryItem);

  const newOrder = orderRepository.create({
    userId,
    status: 'pending',
  });
  await orderRepository.save(newOrder);
  for (const { groceryItemId, quantity } of orderItems) {
    const groceryItem = await groceryRepository.findOne(groceryItemId);
    if (!groceryItem) throw new Error('Item not found');
    const orderItem = orderItemRepository.create({
      order: newOrder,
      groceryItem,
      quantity,
      price: groceryItem.price,
    });
    await orderItemRepository.save(orderItem);

    if (groceryItem.inventory) {
      groceryItem.inventory -= quantity;
      await groceryRepository.save(groceryItem);
    }
  }
  return newOrder;
 }

 static async getUserOrders(userId: number) {
  const orderRepository = getRepository(Order);
  return await orderRepository.find({where: {userId}});
}

static async getAllOrders() {
  const orderRepository = getRepository(Order);
  return await orderRepository.find();
}
}
