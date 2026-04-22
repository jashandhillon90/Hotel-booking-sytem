import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import RoomDetails from "./pages/RoomDetails";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/room/:id" element={<RoomDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;