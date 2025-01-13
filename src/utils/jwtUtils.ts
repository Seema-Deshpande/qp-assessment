import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (userId: number, username: string, role: string) => {
  return jwt.sign({ userId, username, role }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,  // Use the expiration from the config file
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
