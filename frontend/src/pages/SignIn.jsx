import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
const Signin = () => {
  const { login } = useContext(UserContext); // 👈 use context to save user globally
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/auth/signin", {
        email,
        password,
      });

      // ✅ Save user to localStorage and Context
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data.user);

      alert("Login successful!");
      navigate("/"); // Redirect to Generate page
    } catch (error) {
      console.error("Signin error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 bg-[#96A78D] p-6  rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-10 text-[#255F38]">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          className="border-black text-black border-2 p-2 w-[300px] rounded mb-4 ml-13"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          className="border-black text-black border-2 p-2 w-[300px] ml-13 rounded mb-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-all disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <Link to='/signup' ><p className="text-[#895928] mt-5 hover:underline">Don't have an account? Sign Up</p></Link>
      </form>
    </div>
  );
};

export default Signin;
