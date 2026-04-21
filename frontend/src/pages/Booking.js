import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [specialRequests, setSpecialRequests] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const rooms = [
    { id: 1, name: "Deluxe Room", price: 2000 },
    { id: 2, name: "Premium Suite", price: 3500 },
    { id: 3, name: "Royal Suite", price: 5000 },
    { id: 4, name: "Standard Room", price: 1500 },
    { id: 5, name: "Family Room", price: 2800 },
    { id: 6, name: "Penthouse", price: 8000 },
  ];

  const handleBooking = () => {
    if (!roomId || !checkIn || !checkOut || !guests) {
      setError("Please fill in all required fields");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date");
      return;
    }

    setSuccess(true);
    setError("");

    setTimeout(() => {
      navigate("/rooms");
    }, 2000);
  };

  const selectedRoom = rooms.find((r) => r.id === parseInt(roomId));
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Complete Your Booking</h1>
          <p>Secure your perfect stay in just a few steps</p>
        </div>
      </section>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px" }}>
        <div className="container">
          <h2>Booking Details</h2>

          {error && (
            <div
              style={{
                background: "#ffebee",
                color: "#c62828",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                background: "#e8f5e9",
                color: "#2e7d32",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              ✓ Booking confirmed! Redirecting...
            </div>
          )}

          <div className="form-group">
            <label>Select Room</label>
            <select
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value);
                setError("");
              }}
            >
              <option value="">Choose a room...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} - ₹{room.price}/night
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Check-In Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setError("");
              }}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-group">
            <label>Check-Out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setError("");
              }}
              min={checkIn || new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-group">
            <label>Number of Guests</label>
            <select
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
                setError("");
              }}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Requests (Optional)</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or requirements?"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "2px solid #e0e0e0",
                fontFamily: "inherit",
                minHeight: "100px",
                fontSize: "14px",
              }}
            />
          </div>

          {selectedRoom && nights > 0 && (
            <div
              style={{
                background: "#f5f5f5",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "20px",
                borderLeft: "4px solid #d4af37",
              }}
            >
              <h3 style={{ color: "#1a365d", marginBottom: "10px" }}>
                Booking Summary
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Room: {selectedRoom.name}</span>
                <span>₹{selectedRoom.price}/night</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Number of Nights: {nights}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span>Number of Guests: {guests}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "10px",
                  borderTop: "2px solid #ddd",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#d4af37",
                }}
              >
                <span>Total: ₹{totalPrice}</span>
              </div>
            </div>
          )}

          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default Booking;