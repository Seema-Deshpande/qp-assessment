import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import { adminRoutes } from './routes/adminRoutes';
import { userRoutes } from './routes/userRoutes';
import { config } from './config/config';

const app = express();

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

export default app;
