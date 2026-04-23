
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: String,
  roomId: String,

  // 🔥 FIXED
  date: {
    type: Date,
    required: true
  },

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
    default: () => new Date(Date.now() + 2 * 60 * 1000)
  }

}, { timestamps: true });

/* 🔥 UNIQUE ONLY FOR CONFIRMED */
bookingSchema.index(
  { roomId: 1, date: 1 },
  { unique: true, partialFilterExpression: { status: "confirmed" } }
);

/* 🔥 AUTO DELETE EXPIRED LOCKS */
bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Booking", bookingSchema);