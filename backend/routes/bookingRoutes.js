import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* 🔥 CREATE BOOKING (NO AUTH) */
router.post("/", async (req, res) => {
  try {
    const { userId, roomId, date } = req.body;

    const selectedDate = new Date(date);
    const now = new Date();

    const existing = await Booking.findOne({
      roomId,
      date: selectedDate,
      $or: [
        { status: "confirmed" },
        { lockedUntil: { $gt: now } }
      ]
    });

    if (existing) {
      return res.json("❌ Room already booked or locked");
    }

    const lockTime = new Date(now.getTime() + 2 * 60 * 1000);

    const booking = await Booking.create({
      userId,
      roomId,
      date: selectedDate,
      status: "pending",
      lockedUntil: lockTime,
      expiresAt: lockTime
    });

    res.json({
      msg: "✅ Room locked for 2 minutes",
      booking
    });

  } catch (err) {
    res.status(500).json("Server Error");
  }
});


/* ✅ GET ALL BOOKINGS */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});


/* ✅ CONFIRM BOOKING */
router.put("/confirm/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json("Booking not found");

    booking.status = "confirmed";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json("Booking confirmed ✅");

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

    res.json("Booking cancelled ❌");

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

export default router;