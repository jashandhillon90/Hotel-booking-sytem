
import express from "express";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* 🔥 CREATE BOOKING (LOCK SYSTEM) */
router.post("/", auth, async (req, res) => {
  try {
    const { roomId, date } = req.body;
    const userId = req.user.id;

    const selectedDate = new Date(date);
    const now = new Date();

    // 🔒 check already confirmed OR locked
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

    // ⏳ lock for 2 min
    const lockTime = new Date(now.getTime() + 2 * 60 * 1000);

    try {
      const booking = await Booking.create({
        userId,
        roomId,
        date: selectedDate,
        status: "pending",
        lockedUntil: lockTime,
        expiresAt: lockTime
      });

      res.json({
        msg: "✅ Room locked for 2 minutes. Complete booking!",
        booking
      });

    } catch (err) {
      // 🔥 duplicate safety
      if (err.code === 11000) {
        return res.json("❌ Already booked by someone else");
      }
      res.status(500).json("Server Error");
    }

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 🔥 CONFIRM BOOKING */
router.put("/confirm/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json("Booking not found");

    // check expiry
    if (!booking.lockedUntil || booking.lockedUntil < new Date()) {
      return res.json("❌ Booking expired");
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

/* ❌ ADMIN CANCEL */
router.put("/cancel/:id", auth, async (req, res) => {
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

/* 👤 USER CANCEL */
router.put("/user-cancel/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.json("Booking not found");

    if (booking.userId !== req.user.id) {
      return res.status(403).json("Not allowed");
    }

    booking.status = "cancelled";
    booking.lockedUntil = null;
    booking.expiresAt = null;

    await booking.save();

    res.json("Cancelled by user");

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 📋 GET ALL BOOKINGS (ADMIN) */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 👤 GET USER BOOKINGS */
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

/* 📅 CHECK AVAILABILITY */
router.get("/availability/:roomId/:date", async (req, res) => {
  try {
    const { roomId, date } = req.params;

    const booking = await Booking.findOne({
      roomId,
      date: new Date(date),
      status: "confirmed"
    });

    res.json({ available: !booking });

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

export default router;