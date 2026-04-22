import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // 🔥 ALWAYS GET USER
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={nav}>

      {/* LOGO */}
      <Link to="/" style={logo}>
        🏨 LuxeStay
      </Link>

      {/* LINKS */}
      <div style={links}>

        {/* HOME */}
        <Link style={link} to="/">Home</Link>

        {/* ROOMS (ONLY USER OR NOT LOGGED IN) */}
        {(!user || user.role !== "admin") && (
          <Link style={link} to="/rooms">Rooms</Link>
        )}

        {/* MY BOOKINGS (ONLY USER) */}
        {user && user.role !== "admin" && (
          <Link style={link} to="/my-bookings">
            My Bookings
          </Link>
        )}

        {/* ADMIN PANEL */}
        {user?.role === "admin" && (
          <Link style={link} to="/admin">
            Admin
          </Link>
        )}

        {/* AUTH */}
        {!user ? (
          <>
            <Link style={link} to="/login">Login</Link>

            <Link style={signupBtn} to="/register">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span style={{ color: "#ccc" }}>
              👤 {user.name}
            </span>

            <button style={logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

/* 🔥 STYLES */
const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  background: "#0f172a",
  color: "white",
  alignItems: "center",
};

const logo = {
  color: "#f59e0b",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "20px",
};

const links = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const link = {
  color: "white",
  textDecoration: "none",
};

const signupBtn = {
  background: "#f59e0b",
  padding: "8px 15px",
  borderRadius: "6px",
  color: "white",
  textDecoration: "none",
};

const logoutBtn = {
  background: "#ef4444",
  border: "none",
  padding: "8px 15px",
  color: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;