/**
 * Todo routes module
 */

const router = require("express").Router();
const todoController = require("../controllers/todo");

/**
 * Retrieve all todo items
 */
router.get("/get-todo", todoController.getAllTodos);

/**
 * Create a new todo item
 */
router.post("/add-todo", todoController.createTodo);

/**
 * Update todo status by ID
 */
router.post("/update-todo/:id", todoController.updateTodoStatus);

/**

 * Delete todo by ID
 */
router.delete("/del-todo/:id", todoController.deleteTodo);

module.exports = router;
