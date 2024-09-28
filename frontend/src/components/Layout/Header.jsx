import React from "react";
import { Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, onCreateTask }) {
  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-[#FF5A5F]">MustDo</span>
            </Link>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <>
                <button
                  onClick={onCreateTask}
                  className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF5A5F] hover:bg-[#FF385E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                >
                  Create Task
                </button>
                <button
                  onClick={onLogout}
                  className="ml-4 px-4 py-2 border border-[#FF5A5F] rounded-md shadow-sm text-sm font-medium text-[#FF5A5F] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 border border-[#FF5A5F] rounded-md shadow-sm text-sm font-medium text-[#FF5A5F] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#FF385E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5A5F]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
