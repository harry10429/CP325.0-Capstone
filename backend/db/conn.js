/**
 * Database configuration module

 */

const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes connection to MongoDB

 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
