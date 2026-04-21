import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BOOKINGS
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // LOADING SCREEN
  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard 👨‍💼</h1>

      {/* STATS */}
      <div className="cards">
        <div className="card blue">Total: {bookings.length}</div>
        <div className="card yellow">
          Pending: {bookings.filter(b => b.status === "pending").length}
        </div>
        <div className="card green">
          Confirmed: {bookings.filter(b => b.status === "confirmed").length}
        </div>
        <div className="card red">
          Cancelled: {bookings.filter(b => b.status === "cancelled").length}
        </div>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No bookings yet 😴
        </p>
      ) : (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Room</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.userId}</td>
                  <td>{b.roomId}</td>
                  <td>{b.date}</td>
                  <td>
                    <span className={`status ${b.status}`}>
                      {b.status}
                    </span>
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

export default Admin;