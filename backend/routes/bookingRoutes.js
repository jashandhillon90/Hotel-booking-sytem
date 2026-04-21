import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* 🔥 CREATE BOOKING WITH LOCK */
router.post("/", async (req, res) => {
  try {
    const { roomId, date, userId } = req.body;

    const now = new Date();

    // check if already booked OR locked
    const existing = await Booking.findOne({
      roomId,
      date,
      $or: [
        { status: "confirmed" },
        { lockedUntil: { $ne: null, $gt: now } }
      ]
    });

    if (existing) {
      return res.json("❌ Room already booked or temporarily locked");
    }

    // lock for 2 minutes
    const lockTime = new Date(now.getTime() + 2 * 60 * 1000);

    const booking = await Booking.create({
      userId,
      roomId,
      date,
      status: "pending",
      lockedUntil: lockTime,
      expiresAt: lockTime
    });

    res.json({
      msg: "✅ Room locked for 2 minutes. Complete booking!",
      booking
    });

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 🔥 CONFIRM BOOKING */
router.put("/confirm/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json("Booking not found");

    // check expiry
    if (!booking.lockedUntil || booking.lockedUntil < new Date()) {
      return res.json("❌ Booking expired. Try again.");
    }

    booking.status = "confirmed";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json("✅ Booking confirmed");

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* ❌ CANCEL BOOKING */
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json("Booking not found");

    booking.status = "cancelled";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json("❌ Booking cancelled");

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 📋 GET ALL BOOKINGS (ADMIN VIEW) */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

export default router;