import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/rooms");
      }

    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={wrapper}>
      <div style={card}>
        <h2>Welcome Back </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
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

        <button onClick={handleLogin} style={btn}>
          Login
        </button>

        <p>
          Don't have account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

/* styles */
const wrapper = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945)",
  backgroundSize: "cover"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
  width: "300px"
};

const input = {
  width: "100%",
  margin: "10px 0",
  padding: "10px"
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "orange",
  color: "white"
};

export default Login;