
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RoomDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const room = location.state;

  if (!room) {
    return <h2 style={{ padding: "30px" }}>No room data </h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      {/* IMAGE */}
      <img
        src={room.img}
        alt=""
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />

      {/* DETAILS */}
      <h1 style={{ marginTop: "20px" }}>{room.name}</h1>

      <p>⭐ {room.rating}</p>

      <h2>₹{room.price} / night</h2>

      <p style={{ marginTop: "10px", color: "#555" }}>
        Enjoy a luxury stay with free WiFi, AC, TV and premium services.
      </p>

      <button
        style={btn}
        onClick={() => navigate("/rooms")}
      >
        Back
      </button>

    </div>
  );
}

const btn = {
  marginTop: "20px",
  padding: "10px 20px",
  background: "#f59e0b",
  color: "white",
  borderRadius: "8px",
  border: "none"
};

export default RoomDetails;