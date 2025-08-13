// this is the second method in which a module can be required
// const express = require('express');
// const app = express();

// to use the method for requiring a module you have to input "type":"module" in package.json file
import express from "express"; // Import express to create the server
import dotenv from "dotenv"; // Import dotenv to load environment variables this is used to load environment variables from a .env file for our connection string
import cors from "cors"; // Import CORS middleware to handle cross-origin requests
import path from "path"; // Import path to handle file paths

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"; // Import the rate limiter middleware

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Set the port to the value from environment variables or default to 5000
const __dirname = path.resolve(); // Get the current directory name for serving static files

// MIDDLEWARE
// this is used mostly in development to allow requests from the frontend to the backend
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Your React app's URL
    })
  ); //this allows every request from every url
}

app.use(express.json()); // middleware to parse JSON bodies
app.use(rateLimiter);
// app.use(cors()); // Enable CORS for all routes, we are using app.use(express.static) you don't need to enable CORS here

// this line of code includes the notesRoutes module in the notesRoutes.js file
app.use("/api/notes", notesRoutes);

// Serve static files from the React app's build directory
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle any requests that don't match the above routes with the React app's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
