import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CreateTaskDialog from "./CreateTaskDialog";
import ConfirmDialog from "./ConfirmDialog";

function MustDosPage({ refreshTrigger }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [refreshTrigger]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to fetch todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditingTask(todo);
    setIsDialogOpen(true);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTodos(
      todos.map((todo) => (todo._id === updatedTask._id ? updatedTask : todo))
    );
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  const handleTaskCreated = (newTask) => {
    setTodos([...todos, newTask]);
    setIsDialogOpen(false);
  };

  const handleMarkCompleted = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${todoId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Task marked as completed!");
      fetchTodos();
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      toast.error("Failed to mark task as completed. Please try again.");
    }
  };

  const handleDelete = async (todoId) => {
    setDeletingTaskId(todoId);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting task with ID:", deletingTaskId);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${deletingTaskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Delete response:", response.data);
      toast.success("Task deleted successfully!");
      setTodos(todos.filter((todo) => todo._id !== deletingTaskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setDeletingTaskId(null);
    }
  };

  const renderTaskCard = (todo) => (
    <div
      key={todo._id}
      className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300 hover:shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{todo.title}</h3>
      <p className="text-gray-600 mb-4">{todo.description}</p>
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
        <p className="mb-2 mr-4">
          <span className="font-medium">Due:</span>{" "}
          {new Date(todo.dueDate).toLocaleDateString()}
        </p>
        <p className="mb-2 mr-4">
          <span className="font-medium">Priority:</span> {todo.priority}
        </p>
        {todo.assignedUser && (
          <p className="mb-2">
            <span className="font-medium">Assigned to:</span>{" "}
            {todo.assignedUser}
          </p>
        )}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handleEdit(todo)}
          className="bg-[#FF5A5F] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#FF385E] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
        >
          Edit
        </button>
        {todo.status !== "Completed" && (
          <button
            onClick={() => handleMarkCompleted(todo._id)}
            className="bg-[#00A699] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#00887A] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => handleDelete(todo._id)}
          className="bg-[#484848] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#333333] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF5A5F]"></div>
      </div>
    );
  }

  const todoTasks = todos.filter((todo) => todo.status === "To Do");
  const inProgressTasks = todos.filter((todo) => todo.status === "In Progress");
  const completedTasks = todos.filter((todo) => todo.status === "Completed");

  return (
    <div className="container mx-auto mt-8 px-4 mb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">My Must-Dos</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#FF5A5F] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#FF385E] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          Create Task
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <div key={status} className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-[#FF5A5F]">
              {status}
            </h2>
            {(status === "To Do"
              ? todoTasks
              : status === "In Progress"
              ? inProgressTasks
              : completedTasks
            ).length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                No tasks {status.toLowerCase()}.
              </p>
            ) : (
              (status === "To Do"
                ? todoTasks
                : status === "In Progress"
                ? inProgressTasks
                : completedTasks
              ).map(renderTaskCard)
            )}
          </div>
        ))}
      </div>
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={handleTaskUpdated}
      />
      <ConfirmDialog
        isOpen={!!deletingTaskId}
        onClose={() => setDeletingTaskId(null)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}

export default MustDosPage;
