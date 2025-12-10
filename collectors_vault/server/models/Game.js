const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
{
  title: { type: String, required: true },
  console: { type: String, required: true },
  condition: { type: String, default: "" },
  listType: { type: String, enum: ["Collection", "Wishlist"], required: true },
  notes: { type: String, default: "" },
  coverArt: { type: String, default: "" } // <- NEW FIELD
},
{ timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);

