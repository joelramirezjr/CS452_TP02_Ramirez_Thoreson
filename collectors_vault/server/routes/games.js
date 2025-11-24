const express = require("express");
const Game = require("../models/Game");

const router = express.Router();

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch games" });
  }
});

// Add a new game
router.post("/", async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const saved = await newGame.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add game" });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update game" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete" });
  }
});

module.exports = router;
