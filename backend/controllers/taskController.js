const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, assignedUser, priority } =
      req.body;

    console.log("Received task data:", req.body);
    console.log("User ID:", req.user.id);

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      assignedUser,
      priority,
      user: req.user.id,
    });

    const createdTask = await task.save();

    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Error in createTask:", error);
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

const markTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "Completed";
    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, dueDate, status, assignedUser, priority } =
      req.body;
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    task.assignedUser = assignedUser || task.assignedUser;
    task.priority = priority || task.priority;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Use deleteOne instead of remove
    await Task.deleteOne({ _id: req.params.id });

    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error", error: error.toString() });
  }
};

module.exports = {
  getTasks,
  createTask,
  markTaskCompleted,
  updateTask,
  deleteTask, // Add this line
};
