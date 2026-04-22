import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../api";


function Admin() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("STANDARD");
  const [rating, setRating] = useState("");

  const [editId, setEditId] = useState(null);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const roomRes = await axios.get(`${BASE_URL}/api/rooms`);
      const bookingRes = await axios.get(`${BASE_URL}/api/bookings`);

      setRooms(roomRes.data);
      setBookings(bookingRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 ADD / UPDATE ROOM
  const handleRoom = async () => {
    if (!name || !price || !img || !rating) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/rooms/${editId}`, {
          name,
          price,
          img,
          type,
          rating: Number(rating)
        });

        alert("Room Updated ✅");
      } else {
        await axios.post(`${BASE_URL}/api/rooms`, {
          name,
          price,
          img,
          type,
          rating: Number(rating)
        });

        alert("Room Added ✅");
      }

      // RESET
      setName("");
      setPrice("");
      setImg("");
      setType("STANDARD");
      setRating("");
      setEditId(null);

      fetchData();

    } catch (err) {
      alert("Error ❌");
    }
  };

  // 🔥 DELETE ROOM
  const deleteRoom = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/rooms/${id}`);
      alert("Deleted ❌");
      fetchData();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  // 🔥 EDIT ROOM
  const editRoom = (room) => {
    setName(room.name);
    setPrice(room.price);
    setImg(room.img);
    setType(room.type);
    setRating(room.rating);
    setEditId(room._id);
  };

  // 🔥 BOOKING ACTIONS
  const confirmBooking = async (id) => {
    await axios.put(`${BASE_URL}/api/bookings/confirm/${id}`);
    fetchData();
  };

  const cancelBooking = async (id) => {
    await axios.put(`${BASE_URL}/api/bookings/cancel/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: "30px", background: "#0f172a", color: "white", minHeight: "100vh" }}>
      
      <h1>Admin Dashboard 👨‍💼</h1>

      {/* ================= ROOMS ================= */}
      <h2 style={{ marginTop: "20px" }}>Manage Rooms 🏨</h2>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={input} />
        <input placeholder="Image URL" value={img} onChange={(e) => setImg(e.target.value)} style={input} />

        <input
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={input}
        />

        <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
          <option>STANDARD</option>
          <option>LUXURY</option>
          <option>BUDGET</option>
        </select>

        <button onClick={handleRoom} style={greenBtn}>
          {editId ? "Update Room" : "Add Room"}
        </button>
      </div>

      {/* ROOM LIST */}
      <div style={grid}>
        {rooms.map((r) => (
          <div key={r._id} style={card}>
            <img src={r.img} alt="" style={imgStyle} />
            <h3>{r.name}</h3>
            <p>₹{r.price}</p>
            <p>⭐ {r.rating}</p>

            <button onClick={() => editRoom(r)} style={editBtn}>Edit</button>
            <button onClick={() => deleteRoom(r._id)} style={redBtn}>Delete</button>
          </div>
        ))}
      </div>

      {/* ================= BOOKINGS ================= */}
      <h2 style={{ marginTop: "40px" }}>Booking Requests 📋</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div style={tableBox}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Room</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.userId}</td>
                  <td>{b.roomId}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.status}</td>

                  <td>
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => confirmBooking(b._id)} style={greenBtn}>
                          Accept
                        </button>

                        <button onClick={() => cancelBooking(b._id)} style={redBtn}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* STYLES */
const input = { padding: "8px", margin: "5px", borderRadius: "6px" };

const greenBtn = {
  background: "#22c55e",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  margin: "5px"
};

const redBtn = {
  background: "#ef4444",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  margin: "5px"
};

const editBtn = {
  background: "#3b82f6",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  margin: "5px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px"
};

const card = {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px"
};

const imgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover"
};

const tableBox = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px"
};

export default Admin;