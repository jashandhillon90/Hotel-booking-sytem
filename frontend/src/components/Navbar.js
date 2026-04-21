import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname === path;

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#d4af37" : "white",
    textDecoration: "none",
    fontWeight: isActive(path) ? "700" : "500",
    transition: "all 0.3s ease",
    position: "relative",
    paddingBottom: "2px",
  });

  const navLinkHoverStyle = {
    onMouseEnter: (e) => {
      e.target.style.color = "#d4af37";
    },
    onMouseLeave: (e) => {
      if (!isActive(e.target.getAttribute("href"))) {
        e.target.style.color = "white";
      }
    },
  };

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #1a365d 0%, #2d5a8c 100%)",
        padding: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        animation: "slideInDown 0.6s ease-out",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: "26px",
          fontWeight: "800",
          color: "#d4af37",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "15px 30px",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.textShadow = "0 0 20px rgba(212, 175, 55, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.textShadow = "none";
        }}
      >
        🏨 LuxeStay
      </Link>

      {/* Desktop Navigation */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          padding: "15px 30px",
        }}
      >
        <Link
          to="/"
          style={navLinkStyle("/")}
          {...navLinkHoverStyle}
        >
          <span style={{ position: "relative" }}>
            Home
            {isActive("/") && (
              <span
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "#d4af37",
                  borderRadius: "2px",
                  animation: "slideInRight 0.3s ease",
                }}
              />
            )}
          </span>
        </Link>

        <Link
          to="/rooms"
          style={navLinkStyle("/rooms")}
          {...navLinkHoverStyle}
        >
          <span style={{ position: "relative" }}>
            Rooms
            {isActive("/rooms") && (
              <span
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "#d4af37",
                  borderRadius: "2px",
                  animation: "slideInRight 0.3s ease",
                }}
              />
            )}
          </span>
        </Link>

        {role === "admin" && (
          <Link
            to="/admin"
            style={navLinkStyle("/admin")}
            {...navLinkHoverStyle}
          >
            <span style={{ position: "relative" }}>
              Admin Panel
              {isActive("/admin") && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "#d4af37",
                    borderRadius: "2px",
                    animation: "slideInRight 0.3s ease",
                  }}
                />
              )}
            </span>
          </Link>
        )}

        {!role ? (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4af37")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #c4961f 100%)",
                color: "#1a365d",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "700",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
                display: "inline-block",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.3)";
              }}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #c4961f 100%)",
              color: "#1a365d",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "700",
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.3)";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;