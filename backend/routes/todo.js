/**
 * Todo routes module
 */

const router = require("express").Router();
const todoController = require("../controllers/todo");

/**
 * GET /api/
 * Retrieve all todo items
 */
router.get("/", todoController.getAllTodos);

/**
 * POST /api/add-todo
 * Create a new todo item
 */
router.post("/add-todo", todoController.createTodo);

/**
 * POST /api/update-todo/:id
 * Update todo status by ID
 */
router.post("/update-todo/:id", todoController.updateTodoStatus);

/**
 * POST /api/del-todo/:id
 * Delete todo by ID
 */
router.post("/del-todo/:id", todoController.deleteTodo);

module.exports = router;
