import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import homeRouter from './routes/home.routes.js';
import messageRouter from './routes/message.routes.js';
import productRouter from './routes/product.routes.js';
import authRouter from './routes/auth.routes.js'; // Import the auth routes
import authMiddleware from './middleware/auth.js'; // Import the auth middleware

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/', homeRouter);
app.use('/api/auth', authRouter); // Use auth routes for login and signup
app.use('/product', authMiddleware, productRouter); // Protect the product route with auth middleware
app.use('/message', messageRouter);

const PORT = process.env.PORT || 6002;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
