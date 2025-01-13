import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET_KEY || 'your_secret_key',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/grocery_db',
};
