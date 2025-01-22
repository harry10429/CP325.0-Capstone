/**
 * Server entry point
 * Sets up Express server with middleware and routes
 * @module server
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./db/conn");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");

// Initialize Express app
const app = express();
const port = process.env.PORT || 5052;

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request body
app.use(morgan("dev")); // HTTP request logger

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo List API is running",
    endpoints: {
      getAllTodos: "GET /api/get-todo",
      createTodo: "POST /api/add-todo",
      updateTodoStatus: "POST /api/update-todo/:id",
      deleteTodo: "DELETE /api/del-todo/:id",
    },
  });
});

// API routes
app.use("/api", todoRoutes);
app.use("/api/auth", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use("*", (req, res) => {
  console.log(`404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
  process.exit(1);
});
