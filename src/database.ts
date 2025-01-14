import { createConnection } from 'typeorm';
import { config } from './config/config';
import { GroceryItem } from './models/groceryItem';
import { User } from './models/user';
import { Order } from './models/order';
import { OrderItem } from './models/orderItem';

export const connectToDatabase = async () => {
  const maxRetries = 5; // Retry 5 times
  let retries = 0;

  while (retries < maxRetries) {
    try {
      // Try to establish a connection to the database
      await createConnection({
        type: 'postgres',
        url: config.DATABASE_URL,
        entities: [User, Order, OrderItem, GroceryItem],
        synchronize: true,
        logging: false,
      });
      console.log('Connected to the database');
      return; // If successful, exit the function
    } catch (error) {
      console.error(`Database connection failed. Retrying... (${retries + 1}/${maxRetries})`);
      retries++;
      if (retries === maxRetries) {
        console.error('Database connection failed after multiple attempts');
        process.exit(1); // Exit the process after max retries
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
    }
  }
};
