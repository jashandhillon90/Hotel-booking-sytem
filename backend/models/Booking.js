import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: String,
  roomId: String,
  date: String,

  status: {
    type: String,
    default: "pending"
  },

  lockedUntil: {
    type: Date,
    default: null
  },

  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 60 * 1000) // 2 min TTL
  }
});

/* 🔥 AUTO DELETE EXPIRED LOCKS */
bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Booking", bookingSchema);