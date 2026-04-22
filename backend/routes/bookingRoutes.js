import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* 🔥 CREATE BOOKING WITH LOCK */
router.post("/", async (req, res) => {
  try {
    const { roomId, date, userId } = req.body;

    if (!roomId || !date || !userId) {
      return res.status(400).json({ msg: "All fields required" });
    }

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
      return res.status(400).json({
        msg: "❌ Room already booked or temporarily locked"
      });
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

    res.status(201).json({
      msg: "✅ Room locked for 2 minutes. Complete booking!",
      booking
    });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

/* 🔥 CONFIRM BOOKING */
router.put("/confirm/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    // check expiry
    if (!booking.lockedUntil || booking.lockedUntil < new Date()) {
      return res.status(400).json({
        msg: "❌ Booking expired. Try again."
      });
    }

    booking.status = "confirmed";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json({ msg: "✅ Booking confirmed" });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

/* ❌ CANCEL BOOKING */
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking.status = "cancelled";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json({ msg: "❌ Booking cancelled" });

  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

/* 📋 GET ALL BOOKINGS (ADMIN VIEW) */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

export default router;