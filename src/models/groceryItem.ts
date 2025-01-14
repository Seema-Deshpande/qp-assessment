import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './orderItem';

@Entity()
export class GroceryItem {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name ?: string;

  @Column('float')
  price ?: number;

  @Column()
  inventory ?: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.groceryItem)
  orders !: OrderItem[];
}
