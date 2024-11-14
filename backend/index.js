import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js';

const app = express();

// Whitelisted domains (adjust as needed)
const whitelist = ['http://localhost:5173', 'https://www.example1.com', 'https://www.example2.com'];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from the whitelisted domains, or allow requests with no origin (e.g., mobile clients)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request if origin is not in the whitelist
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // List specific headers you want to allow
  credentials: true, // Allow credentials (cookies, HTTP authentication)
  exposedHeaders: ['X-Request-ID'], // Expose headers (optional)
};

// Apply CORS middleware
app.use(cors(corsOptions));

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
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });



