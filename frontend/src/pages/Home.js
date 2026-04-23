import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>

      {/* HERO SECTION */}
      <div style={hero}>
        <div style={overlay}>
          <h1 style={title}>🏨 Find Your Perfect Stay</h1>
          <p style={subtitle}>
            Luxury rooms, best prices & easy booking
          </p>

          <button style={btn} onClick={() => navigate("/rooms")}>
            Explore Rooms →
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={features}>
        <div style={card}>
          <h2>✨ Luxury Rooms</h2>
          <p>Premium quality rooms with best facilities</p>
        </div>

        <div style={card}>
          <h2>💸 Best Prices</h2>
          <p>Affordable pricing for every traveler</p>
        </div>

        <div style={card}>
          <h2>⚡ Instant Booking</h2>
          <p>Quick and easy booking process</p>
        </div>
      </div>

    </div>
  );
}

/* 🔥 STYLES */

const hero = {
  height: "85vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const overlay = {
  textAlign: "center",
  color: "white"
};

const title = {
  fontSize: "50px",
  fontWeight: "bold"
};

const subtitle = {
  fontSize: "18px",
  marginTop: "10px",
  opacity: "0.9"
};

const btn = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer"
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "40px"
};

const card = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "250px"
};

export default Home;