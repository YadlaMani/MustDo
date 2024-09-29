import React from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, onCreateTask }) {
  return (
    <header className="bg-gradient-to-r from-[#FF5A5F] to-[#FF385E] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link
              to="/"
              className="font-bold text-2xl tracking-wide hover:text-gray-200 transition duration-300"
            >
              MustDo
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={onCreateTask}
                  className="bg-white text-[#FF5A5F] px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Create Task
                </button>
                <button
                  onClick={onLogout}
                  className="text-white hover:bg-white hover:text-[#FF5A5F] px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:bg-white hover:text-[#FF5A5F] px-4 py-2 rounded-md text-sm font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-[#FF5A5F] px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
