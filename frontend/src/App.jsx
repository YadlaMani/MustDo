import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Layout/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateTaskDialog from "./components/CreateTaskDialog";
import MustDosPage from "./components/MustDosPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleCreateTask = () => {
    console.log("Opening Create Task Dialog");
    setIsCreateTaskOpen(true);
  };

  const refreshTodos = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onCreateTask={handleCreateTask}
        />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <MustDosPage refreshTrigger={refreshTrigger} />
                ) : (
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      Welcome to MustDo
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Please log in to create and view your todos.
                    </p>
                    <Link
                      to="/login"
                      className="bg-[#FF5A5F] text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-[#FF385E] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Login
                    </Link>
                  </div>
                )
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        {isLoggedIn && (
          <CreateTaskDialog
            isOpen={isCreateTaskOpen}
            onClose={() => setIsCreateTaskOpen(false)}
            onTaskCreated={() => {
              setIsCreateTaskOpen(false);
              refreshTodos();
            }}
          />
        )}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
