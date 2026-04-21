import React, { useState } from "react";

function BookingModal({ room, onClose }) {
  const [date, setDate] = useState("");

  const handleBooking = () => {
    alert(`Room ${room.name} booked on ${date}`);
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "300px"
      }}>
        <h3>Book {room.name}</h3>

        <input type="date" onChange={(e) => setDate(e.target.value)} />

        <button onClick={handleBooking}>Confirm</button>
        <button onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookingModal;