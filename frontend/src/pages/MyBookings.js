import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await axios.get(`${BASE_URL}/api/bookings`);

        const myBookings = res.data.filter(
          (b) => String(b.userId) === String(user.email)
        );

        setBookings(myBookings);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <h2 style={loadingText}>Loading...</h2>;

  return (
    <div style={container}>
      <h2 style={title}>📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <div style={emptyBox}>
          <h3>No bookings yet 😴</h3>
          <p>Go and book your first room!</p>
        </div>
      ) : (
        <div style={grid}>
          {bookings.map((b, i) => (
            <div key={i} style={card}>

              <h3 style={room}>{b.roomId}</h3>

              <p>📅 {new Date(b.date).toLocaleDateString()}</p>

              <p style={getStatusStyle(b.status)}>
                {b.status.toUpperCase()}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 🔥 STYLES */

const container = {
  padding: "30px",
  background: "#f5f7fb",
  minHeight: "100vh"
};

const title = {
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  transition: "0.3s"
};

const room = {
  marginBottom: "10px"
};

const emptyBox = {
  textAlign: "center",
  marginTop: "50px",
  color: "#555"
};

const loadingText = {
  padding: "30px"
};

/* 🔥 STATUS COLORS */
const getStatusStyle = (status) => {
  if (status === "confirmed") {
    return { color: "green", fontWeight: "bold" };
  }
  if (status === "pending") {
    return { color: "orange", fontWeight: "bold" };
  }
  return { color: "red", fontWeight: "bold" };
};

export default MyBookings;