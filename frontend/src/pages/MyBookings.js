import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        const res = await axios.get("http://localhost:5000/api/bookings");

        const myBookings = res.data.filter(
          (b) => b.userId === user.email
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

  if (loading) return <h2 style={{ padding: "30px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>📋 My Bookings</h2>

      {bookings.length === 0 ? (
        <div style={emptyBox}>
          <h3>No bookings yet 😴</h3>
          <p>Go and book your first room!</p>
        </div>
      ) : (
        bookings.map((b, i) => (
          <div key={i} style={card}>
            <h3>{b.roomId}</h3>
            <p>Date: {new Date(b.date).toLocaleDateString()}</p>
            <p>Status: {b.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: "15px",
  margin: "10px 0",
  borderRadius: "10px",
};

const emptyBox = {
  marginTop: "40px",
  textAlign: "center",
  color: "#555",
};

export default MyBookings;