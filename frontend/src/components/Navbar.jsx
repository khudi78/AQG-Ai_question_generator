import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        🧠 AI Exam
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-200 font-medium">
          Home
        </Link>

        {!user ? (
          <>
            <Link to="/signup" className="hover:text-gray-200 font-medium">
              Register
            </Link>
            <Link to="/signin" className="hover:text-gray-200 font-medium">
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Link to="/generate" className="hover:text-gray-200 font-medium">
              Generate
            </Link>
            <Link to="/profile" className="hover:text-gray-200 font-medium">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
