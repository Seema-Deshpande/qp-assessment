import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { adminRoutes } from './routes/adminRoutes';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';
import { config } from './config/config';
import { connectToDatabase } from './database';

const app = express();
connectToDatabase();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Grocery API is running smoothly' });
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

export default app;
