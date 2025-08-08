// WE USE MONGOOSE TO CONNECT TO MONGODB
// Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI) // Use the MongoDB URI from environment variables this is our connection string

    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // 1 means Exit the process with failure
  }
};
