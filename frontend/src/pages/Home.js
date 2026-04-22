import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {
    if (!city) return alert("Enter city");

    if (!checkIn || !checkOut) {
      return alert("Select dates");
    }

    if (new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) {
      return alert("❌ Past date not allowed");
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      return alert("❌ Checkout must be after checkin");
    }

    navigate(`/rooms?city=${city}`);
  };

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>

      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>Luxury Stay </h1>
        <p style={heroSub}>Find best hotels instantly</p>

        <div style={{ marginTop: "25px" }}>
          <button style={primaryBtn} onClick={() => navigate("/rooms")}>
            Explore Rooms
          </button>

          <button style={secondaryBtn} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </section>

      {/* SEARCH */}
      <div style={searchWrapper}>
        <div style={searchBox}>

          <input
            placeholder="City / Hotel"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={input}
          />

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            style={input}
            min={new Date().toISOString().split("T")[0]}
          />

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            style={input}
            min={checkIn || new Date().toISOString().split("T")[0]}
          />

          <button style={searchBtn} onClick={handleSearch}>
            Search
          </button>

        </div>
      </div>

      {/* DESTINATIONS */}
      <section style={section}>
        <h2 style={heading}>Popular Destinations 🌍</h2>

        <div style={grid}>
          {destinations.map((d, i) => (
            <div key={i} style={imageCard}>
              <img src={d.img} alt="" style={img} />
              <div style={overlay}>{d.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section style={section}>
        <h2 style={heading}>About LuxeStay</h2>
        <p style={{ maxWidth: "600px", margin: "auto" }}>
          LuxeStay helps you book premium hotels at the best prices.
          Experience comfort, luxury and smooth booking with us.
        </p>
      </section>

      {/* FEATURES */}
      <section style={section}>
        <h2 style={heading}>Why Choose Us?</h2>

        <div style={grid}>
          <div style={card}>🏆 Premium Service</div>
          <div style={card}>💰 Best Price</div>
          <div style={card}>⚡ Instant Booking</div>
          <div style={card}>📞 24/7 Support</div>
        </div>
      </section>

      {/* ROOMS */}
      <section style={section}>
        <h2 style={heading}>Featured Rooms </h2>

        <div style={grid}>
          {rooms.map((r, i) => (
            <div key={i} style={roomCard}>
              <img src={r.img} style={img} alt="" />
              <h3>{r.name}</h3>
              <p>₹{r.price}/night</p>
              <button style={primaryBtn} onClick={() => navigate("/rooms")}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={stats}>
        <Stat n="1000+" t="Guests" />
        <Stat n="50+" t="Rooms" />
        <Stat n="5⭐" t="Rating" />
        <Stat n="5000+" t="Reviews" />
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2>Ready to Book?</h2>
        <button style={primaryBtn} onClick={() => navigate("/rooms")}>
          Book Now
        </button>
      </section>

    </div>
  );
}

/* DATA */
const destinations = [
  { name: "Goa", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  { name: "Manali", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
  { name: "Mumbai", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66" },
];

const rooms = [
  { name: "Luxury Suite", price: 5000, img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
  { name: "Deluxe Room", price: 3000, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427" },
  { name: "Budget Room", price: 1500, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
];

function Stat({ n, t }) {
  return (
    <div>
      <h2>{n}</h2>
      <p>{t}</p>
    </div>
  );
}

/* STYLES */
const hero = {
  height: "90vh",
  background:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa)",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: "white",
};

const heroTitle = { fontSize: "50px", fontWeight: "800" };
const heroSub = { marginTop: "10px" };

const primaryBtn = {
  padding: "12px 25px",
  background: "#f59e0b",
  color: "white",
  borderRadius: "8px",
  marginRight: "10px",
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "white",
  borderRadius: "8px",
};

const searchWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "-40px",
};

const searchBox = {
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  display: "flex",
  gap: "10px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
};

const input = {
  padding: "12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
};

const searchBtn = {
  background: "#f59e0b",
  color: "white",
  padding: "12px 20px",
  borderRadius: "8px",
};

const section = { padding: "60px 20px", textAlign: "center" };
const heading = { fontSize: "32px", marginBottom: "20px" };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
};

const imageCard = { position: "relative", borderRadius: "10px", overflow: "hidden" };

const img = { width: "100%", height: "200px", objectFit: "cover" };

const overlay = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0,0,0,0.5)",
  color: "white",
  padding: "10px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const roomCard = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const stats = {
  background: "#1e3a5f",
  color: "gold",
  display: "flex",
  justifyContent: "space-around",
  padding: "40px",
};

const cta = {
  background: "#2d5a8c",
  color: "white",
  textAlign: "center",
  padding: "60px",
};

export default Home;