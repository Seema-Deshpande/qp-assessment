import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './orderItem';
import { User } from './user';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  userId !: number;

  @Column({ default: 'pending' })
  status !: string;

  @ManyToOne(() => User, (user) => user.orders)
  user !: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items !: OrderItem[];
}
