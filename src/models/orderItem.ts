import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order';
import { GroceryItem } from './groceryItem';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id !: number;

  @ManyToOne(() => Order, (order) => order.items)
  order !: Order;

  @ManyToOne(() => GroceryItem, (groceryItem) => groceryItem.orders)
  groceryItem !: GroceryItem;

  @Column()
  quantity !: number;

  @Column('decimal')
  price !: number;
}
