import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';

const app = express();

// Enable CORS for all routes and allow requests from the Render production domain
app.use(cors({
  origin: 'https://your-app-name.onrender.com', // Replace with your actual Render app URL after deployment
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middleware for parsing JSON requests
app.use(express.json());

// Welcome Route
app.get('/', (req, res) => {
  return res.status(234).send('Welcome To MERN Stack Tutorial');
});

// Book Routes (API for books)
app.use('/books', booksRoute);

// MongoDB Connection and Server Setup
mongoose
  .connect(mongodb+srv://aryanmishra:mrmarlega@cluster0.cum0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0) 
  .then(() => {
    console.log('App connected to the database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });




