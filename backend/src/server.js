// this is the second method in which a module can be required
// const express = require('express');
// const app = express();

// to use the method for requiring a module you have to input "type":"module" in package.json file
import express from "express";
import dotenv from "dotenv"; // Import dotenv to load environment variables this is used to load environment variables from a .env file for our connection string
import cors from "cors"; // Import CORS middleware to handle cross-origin requests


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"; // Import the rate limiter middleware


dotenv.config(); // Load environment variables from .env file

const app = express(); 
const PORT = process.env.PORT || 5000; // Set the port to the value from environment variables or default to 5000


// MIDDLEWARE
app.use(
  cors({ 
  origin: "http://localhost:5173", // Allow requests from this origin (your frontend URL)
 })); //this allows every request from every url

app.use(express.json()); // middleware to parse JSON bodies
app.use(rateLimiter);

// this line of code includes the notesRoutes module in the notesRoutes.js file
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server started on PORT:", PORT);
});

});
