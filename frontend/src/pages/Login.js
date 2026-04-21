import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      localStorage.setItem("role", "user");
      navigate("/rooms");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1a365d" }}>
          Welcome Back 👋
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Sign in to continue your journey
        </p>

        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "white",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "15px",
          }}
        >
          Sign In
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            fontSize: "13px",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#d97706" }}>
            Sign up
          </Link>
        </p>

        <p
          style={{
            marginTop: "15px",
            fontSize: "11px",
            color: "#999",
            textAlign: "center",
          }}
        >
          Demo:<br />
          Admin → admin@gmail.com / admin123
        </p>
      </div>
    </div>
  );
}

export default Login;