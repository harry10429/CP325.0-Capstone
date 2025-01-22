/**
 * User routes module
 * Defines API endpoints for user operations
 * @module routes/user
 */

const router = require("express").Router();
const userController = require("../controllers/user");

/**
 * POST /api/auth/register
 * Register new user
 */
router.post("/register", userController.register);

/**
 * POST /api/auth/login
 * Login user
 */
router.post("/login", userController.login);

module.exports = router;
