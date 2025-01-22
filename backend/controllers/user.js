/**
 * User controller
 */

const User = require("../models/user");

class UserController {
  /**
   * Register new user

   */
  async register(req, res) {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      // Create new user
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          username: newUser.username,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error registering user",
        error: error.message,
      });
    }
  }

  /**
   * Login user
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }

      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      res.json({
        success: true,
        message: "Login successful",
        data: {
          username: user.username,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error logging in",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
