import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif" }}>

      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>Luxury Stay, Perfect Comfort ✨</h1>
        <p style={heroSub}>Book hotels at best prices instantly</p>

        <div style={{ marginTop: "25px" }}>
          <button style={primaryBtn} onClick={() => navigate("/rooms")}>
            Explore Rooms
          </button>

          <button style={secondaryBtn} onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </section>

      {/* SEARCH */}
      <div style={searchWrapper}>
        <div style={searchBox}>
          <input placeholder="City / Hotel" style={input} />
          <input type="date" style={input} />
          <input type="date" style={input} />
          <button style={searchBtn}>Search</button>
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

      {/* FEATURES */}
      <section style={section}>
        <h2 style={heading}>Why Choose LuxeStay?</h2>

        <div style={grid}>
          {features.map((f, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: "30px" }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section style={section}>
        <h2 style={heading}>Featured Rooms 🏨</h2>

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
      <div style={stats}>
        <Stat n="1000+" t="Guests" />
        <Stat n="50+" t="Rooms" />
        <Stat n="5⭐" t="Rating" />
        <Stat n="5000+" t="Reviews" />
      </div>

      {/* TESTIMONIAL */}
      <section style={testimonial}>
        <h2>What Our Customers Say</h2>
        <p>
          “Amazing experience! Rooms were clean and luxurious. Highly recommend!”
        </p>
        ⭐⭐⭐⭐⭐
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2>Ready to Book?</h2>
        <button style={primaryBtn} onClick={() => navigate("/rooms")}>
          Book Your Stay
        </button>
      </section>

      {/* FOOTER */}
      <footer style={footer}>
        <div style={footerGrid}>

          <div>
            <h2 style={{ color: "#f59e0b" }}>LuxeStay</h2>
            <p style={footerText}>
              Book luxury hotels at best prices. Experience comfort & elegance.
            </p>
          </div>

          <div>
            <h3>About</h3>
            <p style={footerText}>Our Story</p>
            <p style={footerText}>Careers</p>
            <p style={footerText}>Press</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p style={footerText}>Home</p>
            <p style={footerText}>Rooms</p>
            <p style={footerText}>Booking</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p style={footerText}>📍 India</p>
            <p style={footerText}>📧 support@luxestay.com</p>
            <p style={footerText}>📞 +91 9876543210</p>
          </div>

        </div>

        <hr style={{ margin: "30px 0", borderColor: "#333" }} />

        <p style={{ textAlign: "center", color: "#aaa" }}>
          © 2026 LuxeStay. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

/* DATA */
const destinations = [
  {
    name: "Goa",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Manali",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    name: "Mumbai",
    img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66",
  },
];

const rooms = [
  {
    name: "Luxury Suite",
    price: 5000,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    name: "Deluxe Room",
    price: 3000,
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  },
  {
    name: "Budget Room",
    price: 1500,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
];

const features = [
  { icon: "🏆", title: "Premium", desc: "Top quality service" },
  { icon: "💰", title: "Best Price", desc: "Affordable deals" },
  { icon: "⚡", title: "Fast Booking", desc: "Quick process" },
  { icon: "📞", title: "Support", desc: "24/7 help" },
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
  borderRadius: "6px",
  marginRight: "10px",
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "white",
  borderRadius: "6px",
};

const searchWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "-40px",
};

const searchBox = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const input = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
};

const searchBtn = {
  background: "#f59e0b",
  color: "white",
  padding: "10px 20px",
  borderRadius: "6px",
};

const section = { padding: "60px 20px", textAlign: "center" };
const heading = { fontSize: "32px", marginBottom: "20px" };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px",
};

const imageCard = {
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

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

const testimonial = {
  padding: "50px",
  textAlign: "center",
};

const cta = {
  background: "#2d5a8c",
  color: "white",
  textAlign: "center",
  padding: "60px",
};

const footer = {
  background: "#0f172a",
  color: "white",
  padding: "50px 20px",
};

const footerGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "30px",
};

const footerText = {
  fontSize: "14px",
  color: "#ccc",
};

export default Home;