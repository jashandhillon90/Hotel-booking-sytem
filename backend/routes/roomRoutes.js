
import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

/* ADD */
router.post("/", async (req, res) => {
  const room = await Room.create(req.body);
  res.json(room);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
  const updated = await Room.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;