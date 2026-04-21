import React, { useState } from "react";

function Rooms() {
  const [search, setSearch] = useState("");

  const rooms = [
    {
      name: "Deluxe Room",
      price: 2000,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      type: "STANDARD",
    },
    {
      name: "Premium Suite",
      price: 3500,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      type: "LUXURY",
    },
    {
      name: "Royal Suite",
      price: 5000,
      rating: 5,
      img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      type: "LUXURY",
    },
    {
      name: "Standard Room",
      price: 1500,
      rating: 4.2,
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      type: "BUDGET",
    },
  ];

  const filteredRooms = rooms.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rooms-container">
      {/* HEADER */}
      <div className="header">
        <h1>🏨 Our Rooms & Suites</h1>
        <p>Choose your perfect stay</p>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ROOMS GRID */}
      <div className="room-grid">
        {filteredRooms.map((room, i) => (
          <div className="room-card" key={i}>
            {/* IMAGE */}
            <div className="image-box">
              <img src={room.img} alt="" />

              <span
                className={`tag ${
                  room.type === "LUXURY"
                    ? "gold"
                    : room.type === "STANDARD"
                    ? "blue"
                    : "green"
                }`}
              >
                {room.type}
              </span>
            </div>

            {/* CONTENT */}
            <div className="content">
              <h3>{room.name}</h3>

              <p className="rating">
                ⭐ {room.rating} | Free WiFi • AC • TV
              </p>

              <h2>₹{room.price}</h2>

              <div className="btn-group">
                <button className="book-btn">Book</button>
                <button className="view-btn">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;