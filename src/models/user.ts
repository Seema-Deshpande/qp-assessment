// src/models/user.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username !: string;

  @Column({ type: 'varchar', length: 255 })
  password !: string;  // The user's hashed password

  @Column('varchar', { length: 50, default: 'user' })
  role !: string;  // User's role, can be 'user' or 'admin'

  @Column('varchar', { length: 255, nullable: true })
  email ?: string;  // Optional field for the user's email

  @Column('varchar', { length: 20, nullable: true })
  phone ?: string;  // Optional phone number

  @Column('boolean', { default: true })
  isActive  !: boolean;  // Whether the user account is active
}
