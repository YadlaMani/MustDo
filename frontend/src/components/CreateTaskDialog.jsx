import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed: npm install axios
import { toast } from "react-toastify"; // For showing notifications

function CreateTaskDialog({
  isOpen,
  onClose,
  task,
  onTaskCreated,
  onTaskUpdated,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("To Do");
  const [assignedUser, setAssignedUser] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setStatus(task.status || "To Do");
      setAssignedUser(task.assignedUser || "");
      setPriority(task.priority || "Medium");
    } else {
      resetForm();
    }
  }, [task]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("To Do");
    setAssignedUser("");
    setPriority("Medium");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const taskData = {
      title,
      description,
      dueDate,
      status,
      assignedUser,
      priority,
    };

    try {
      const token = localStorage.getItem("token");
      let response;

      if (task) {
        console.log("Updating task with ID:", task._id);
        console.log("Task data:", taskData);
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Update response:", response.data);
        toast.success("Task updated successfully!");
        onTaskUpdated(response.data);
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/tasks`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Task created successfully!");
        onTaskCreated(response.data);
      }

      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      console.error("Error response:", error.response);
      toast.error(
        `Failed to ${task ? "update" : "create"} task. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="assignedUser"
              className="block text-sm font-medium text-gray-700"
            >
              Assigned User
            </label>
            <input
              type="text"
              id="assignedUser"
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF385E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
              disabled={isLoading}
            >
              {isLoading
                ? task
                  ? "Updating..."
                  : "Creating..."
                : task
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskDialog;
