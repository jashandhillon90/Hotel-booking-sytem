import Booking from "../models/Booking.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  const { userId, roomId, date } = req.body;

  const existing = await Booking.findOne({ roomId, date });

  if (existing) {
    return res.status(400).json({ msg: "Room already booked" });
  }

  const booking = await Booking.create({
    userId,
    roomId,
    date,
  });

  res.json(booking);
};