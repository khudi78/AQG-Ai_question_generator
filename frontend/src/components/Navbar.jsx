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
    <nav className="bg-[#134135] text-white px-6 py-3 shadow-md flex justify-between items-center ">
      <Link to="/">
        <div className="text-2xl font-bold text-[#B99470]"> AQG - AI Question Generator</div>
      </Link>

      <div className="flex gap-6 items-center text-[#B99470]">
        <Link to="/" className="hover:text-gray-200 font-medium">
         <div className="text-[#B99470] hover:text-[hsl(30,58%,56%)] hover:underline">Home</div> 
        </Link>

        {!user ? (
          <>
            <Link to="/signup" className="hover:text-gray-200 font-medium">
              <div className="text-[#B99470] hover:text-[hsl(30,58%,56%)] hover:underline">Sign Up</div>
            </Link>
            <Link to="/signin" className="hover:text-gray-200 font-medium">
              <div className="text-[#B99470] hover:text-[hsl(30,58%,56%)] hover:underline">Sign In</div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/generate" className="hover:text-gray-200 font-medium">
              <div className="text-[#B99470] hover:text-[hsl(30,58%,56%)] hover:underline">Generate</div>
            </Link>
            <Link to="/profile" className="hover:text-gray-200 font-medium">
              <div className="text-[#B99470] hover:text-[hsl(30,58%,56%)] hover:underline">Profile</div>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-[#B99470] px-3 py-1 rounded-md font-medium hover:bg-gray-100 transition-all"
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
