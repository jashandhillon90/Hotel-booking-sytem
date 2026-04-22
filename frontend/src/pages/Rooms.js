import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH ROOMS
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rooms");
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  // 🔥 BOOK
  const handleBooking = async (room) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Login first ❌");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        userId: user.email,
        roomId: room.name,
        date: new Date()
      });

      alert("Booked ✅");

    } catch (err) {
      alert("Booking failed ❌");
    }
  };

  // 🔥 VIEW
  const handleView = (room) => {
    navigate("/room/1", { state: room });
  };

  // 🔥 FILTER
  const filteredRooms = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>

      <h1 style={{ textAlign: "center" }}>🏨 Our Rooms</h1>

      {/* SEARCH */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />
      </div>

      {/* GRID */}
      <div style={grid}>
        {filteredRooms.map((room) => (
          <div key={room._id} style={card}>

            <img src={room.img} alt="" style={imgStyle} />

            <h3>{room.name}</h3>
            <p>⭐ {room.rating}</p>
            <h2>₹{room.price}</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <button style={bookBtn} onClick={() => handleBooking(room)}>
                Book
              </button>

              <button style={viewBtn} onClick={() => handleView(room)}>
                View
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

/* STYLES */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px"
};

const card = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const imgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px"
};

const searchBox = {
  padding: "10px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const bookBtn = {
  flex: 1,
  padding: "10px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const viewBtn = {
  flex: 1,
  padding: "10px",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "6px"
};

export default Rooms;