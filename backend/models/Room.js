import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  img: String,
  type: String
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);