import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Layout/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateTaskDialog from "./components/CreateTaskDialog";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

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
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to MustDo
                </h1>
              }
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        {isLoggedIn && isCreateTaskOpen && (
          <CreateTaskDialog
            isOpen={isCreateTaskOpen}
            onClose={() => {
              console.log("Closing Create Task Dialog");
              setIsCreateTaskOpen(false);
            }}
          />
        )}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
