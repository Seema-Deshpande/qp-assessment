// src/models/user.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { Order } from './order';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username !: string;

  @Column({ type: 'varchar', length: 255 })
  password !: string;

  @Column('varchar', { length: 50, default: 'user' })
  role !: string;

  @Column('varchar', { length: 255, nullable: true })
  email ?: string;

  @Column('varchar', { length: 20, nullable: true })
  phone ?: string;

  @Column('boolean', { default: true })
  isActive  !: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders !: Order[];
}
