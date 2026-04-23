
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express(); // ✅ PEHLE APP BANAA

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes); // ✅ AB SAHI JAGAH

app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});

/* CONNECT DB */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("🔥 Server running on port 5000");
    });

  } catch (error) {
    console.log("❌ DB Error:", error);
  }
};

startServer();