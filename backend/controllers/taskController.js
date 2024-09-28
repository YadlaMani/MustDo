const Task = require("../models/Task");

exports.createTask = async (req, res) => {
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
