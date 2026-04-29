import express from 'express';
import cors from 'cors';

import todoRoutes from './routes/todoRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Health check (optional but nice)
app.get('/', (req, res) => {
  res.send('TODO API is running');
});

export default app;