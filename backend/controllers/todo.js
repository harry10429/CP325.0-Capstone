/**
 * Todo controller

 */

const Todo = require("../models/todo");

class TodoController {
  /**
     * Get all todo items
     * @async

     */
  async getAllTodos(req, res) {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      res.json({
        success: true,
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching todos",
        error: error.message,
      });
    }
  }

  /**
   * Create a new todo item
   * @async
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   */
  async createTodo(req, res) {
    try {
      const { value, isCompleted = false } = req.body;

      if (!value || value.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Todo content is required",
        });
      }

      const newTodo = new Todo({ value, isCompleted });
      const savedTodo = await newTodo.save();

      res.status(201).json({
        success: true,
        data: savedTodo,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating todo",
        error: error.message,
      });
    }
  }

  /**
   * Update todo status
   * @async
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   */
  async updateTodoStatus(req, res) {
    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      todo.isCompleted = !todo.isCompleted;
      const updatedTodo = await todo.save();

      res.json({
        success: true,
        data: updatedTodo,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating todo",
        error: error.message,
      });
    }
  }

  /**
     * Delete a todo item

     */
  async deleteTodo(req, res) {
    try {
      const todo = await Todo.findById(req.params.id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      await todo.deleteOne();

      res.json({
        success: true,
        message: "Todo deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting todo",
        error: error.message,
      });
    }
  }
}

module.exports = new TodoController();
