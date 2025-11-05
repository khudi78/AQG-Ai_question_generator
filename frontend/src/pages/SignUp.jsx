import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/api/auth/signup", {
        name,
        email,
        password,
      });

      // ✅ Save user to localStorage and Context
      localStorage.setItem("user", JSON.stringify(res.data.user));
      login(res.data.user);

      alert("Signup successful!");
      navigate("/generate");
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 mt-40 bg-[#96A78D] rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-10 text-[#255F38]">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="border-black border-2 text-black p-2 w-[300px] rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className=" border-black border-2 text-black p-2 w-[300px]  rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border-black border-2 text-black p-2 w-[300px]  rounded mb-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-all disabled:opacity-70"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <Link to='/signin' ><p className="text-[#895928] mt-5 hover:underline">Already have an account? Sign In</p></Link>
      </form>
    </div>
  );
};

export default Signup;
