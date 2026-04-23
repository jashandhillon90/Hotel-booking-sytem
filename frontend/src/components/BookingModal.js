import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function BookingModal({ room, onClose }) {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first ❌");
        return;
      }

      const res = await axios.post(`${BASE_URL}/api/bookings`, {
        userId: user.email,        // 🔥 IMPORTANT
        roomId: room.name,
        date: new Date(date)
      });

      alert(res.data.msg || "Booking successful ✅");
      onClose();

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data || "❌ Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Book {room.name}</h3>

        <input
          type="date"
            min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={input}
        />

        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button
            style={confirmBtn}
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm"}
          </button>

          <button style={cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  width: "300px",
  textAlign: "center"
};

const input = {
  padding: "10px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const confirmBtn = {
  flex: 1,
  padding: "10px",
  background: "#22c55e",
  color: "white",
  borderRadius: "6px",
  border: "none"
};

const cancelBtn = {
  flex: 1,
  padding: "10px",
  background: "#ef4444",
  color: "white",
  borderRadius: "6px",
  border: "none"
};

export default BookingModal;