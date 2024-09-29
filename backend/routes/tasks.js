const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  markTaskCompleted,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// Get all tasks for the current user
router.get("/", protect, getTasks);

// Create a new task
router.post("/", protect, createTask);

// Mark a task as completed
router.patch("/:id/complete", protect, markTaskCompleted);

// Update a task
router.put("/:id", protect, updateTask);

// Delete a task
router.delete("/:id", protect, deleteTask);

module.exports = router;
