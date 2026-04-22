import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role }
      );

      setSuccess("Account created successfully ");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2 style={{ textAlign: "center" }}>Create Account </h2>

        {error && <p style={errorBox}>{error}</p>}
        {success && <p style={successBox}>{success}</p>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        {/* 🔥 ROLE SELECT */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={input}
        >
          <option value="user">Register as User</option>
          <option value="admin">Register as Admin</option>
        </select>

        <button onClick={handleRegister} style={btn}>
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

/* 🔥 STYLES */
const wrapper = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1590490360182-c33d57733427)",
  backgroundSize: "cover"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "320px"
};

const input = {
  width: "100%",
  margin: "10px 0",
  padding: "10px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#22c55e",
  color: "white"
};

const errorBox = {
  color: "red",
  fontSize: "14px"
};

const successBox = {
  color: "green",
  fontSize: "14px"
};

export default Register;