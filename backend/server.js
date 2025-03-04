import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import pasteRoutes from './routes/pasteRoutes.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pastes', pasteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
