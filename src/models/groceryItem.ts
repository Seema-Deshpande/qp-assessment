import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // Marks the class as an entity/table in the database
export class GroceryItem {
  @PrimaryGeneratedColumn()  // Primary key, automatically generated
  id !: number;

  @Column()  // A column for storing the name of the grocery item
  name ?: string;

  @Column('float')  // Price with a specific type (float)
  price ?: number;

  @Column()  // Inventory count
  inventory ?: number;
}
