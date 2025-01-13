import { createConnection } from 'typeorm';
import { config } from './config/config';
import { GroceryItem } from './models/groceryItem';

export const connectToDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      url: config.DATABASE_URL,
      entities: [
        GroceryItem
      ],
      synchronize: true,
      logging: false
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};
